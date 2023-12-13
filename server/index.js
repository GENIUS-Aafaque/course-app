const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');;
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

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

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});
