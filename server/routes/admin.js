const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Admin, Course } = require("../db");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// Admin routes
router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Admin already exists" });
    } else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json("Invalid credentials");
    }
});

router.get('/me', authenticateJwt, (req, res) => {
    res.json({ username: req.user.username })
})

router.post('/courses', authenticateJwt, async (req, res) => {
    // logic to create a course
    const newCourse = new Course(req.body);
    newCourse.id = Math.floor(Math.random() * 1000);
    await newCourse.save();
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to edit a course
    try {
        const course = await Course.findOneAndUpdate({ "id": req.params.courseId }, req.body, { new: true });
        if (course) {
            res.json({ message: 'Course updated successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/courses', authenticateJwt, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({});
    res.send({ courses });
});

module.exports = router