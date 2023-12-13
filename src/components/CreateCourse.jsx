import React, { useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [course, setCourse] = React.useState({
        title: "",
        description: "",
        imgLink: "",
        price: "",
    });

    const handleInputChange = (e) => {
        setCourse((oldValue) => {
            return { ...oldValue, [e.target.name]: e.target.value };
        });
    };

    function createCourse() {
        axios.post("http://localhost:3000/admin/courses", course, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        setCourse({
            title: "",
            description: "",
            imgLink: "",
            price: "",
        });
        alert("Course Created Succeccfully");
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#eeeeee",
                display: "grid",
                placeItems: "center",
            }}
        >
            <div
                style={{
                    marginTop: -100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3">Create New Course</Typography>
                <br />
                <Card variant="outlined" style={{ padding: 20, width: 300 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        type={"text"}
                        name="title"
                        value={course.title}
                        onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        type={"text"}
                        name="description"
                        value={course.description}
                        onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Image Link"
                        variant="outlined"
                        type={"text"}
                        name="imgLink"
                        value={course.imgLink}
                        onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        type={"number"}
                        name="price"
                        value={course.price}
                        onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={createCourse}>
                        Create Course
                    </Button>
                </Card>
            </div>
        </div>
    );
}
export default CreateCourse;
