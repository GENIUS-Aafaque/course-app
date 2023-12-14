const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Admin, Course } = require("../db");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// User routes
router.post('/signup', async (req, res) => {
    // logic to sign up user
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        req.json({ message: "User already exists" })
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    // logic to log in user
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json("Invalid credentials");
    }
});

router.get('/courses', authenticateJwt, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published: true });
    res.json({ courses });
});

router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to purchase a course
    try {
        const course = await Course.findById(req.params.courseId);
        if (course) {
            const user = await User.findOne({ username: req.user.username });
            if (user) {
                user.purchasedCourses.push(course);
                await user.save();
                res.json({ message: 'Course purchased successfully' });
            } else {
                res.status(403).json({ message: 'User not found' });
            }
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

module.exports = router