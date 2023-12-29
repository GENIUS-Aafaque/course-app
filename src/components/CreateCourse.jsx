import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

function CreateCourse() {
    const [course, setCourse] = useState({
        title: "",
        description: "",
        imageLink: "",
        price: "",
        published: true,
    });

    const handleInputChange = (e) => {
        setCourse((oldValue) => {
            return { ...oldValue, [e.target.name]: e.target.value };
        });
    };

    function createCourse() {
        axios
            .post(`${BASE_URL}/admin/courses`, course, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then(() => {
                setCourse({
                    title: "",
                    description: "",
                    imageLink: "",
                    price: "",
                    published: true,
                });
                alert("Course Created Succeccfully");
            });
    }

    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            <div
                style={{
                    marginTop: 100,
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
                        name="imageLink"
                        value={course.imageLink}
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
