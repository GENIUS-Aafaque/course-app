const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

app.use(express.json());

const SECRET = "S3cr31-keY";

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: String,   // alt - { type: String }
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://GENIUS:genius313@cluster0.nnx2fnq.mongodb.net/course-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "course-app"
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Admin routes
app.post('/admin/signup', async (req, res) => {
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

app.post('/admin/login', async (req, res) => {
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

app.post('/admin/courses', authenticateJwt, async (req, res) => {
    // logic to create a course
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to edit a course
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
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

app.get('/admin/courses', authenticateJwt, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({});
    res.send({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
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

app.post('/users/login', async (req, res) => {
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

app.get('/users/courses', authenticateJwt, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published: true });
    res.json({ courses });
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
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

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
