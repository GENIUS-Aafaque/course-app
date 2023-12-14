import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    useEffect(() => {
        axios
            .get("http://localhost:3000/admin/courses", {
                headers: {
                    username: "sameer",
                    password: 123,
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setCourses(response.data.courses);
            })
            .catch(() => console.log("error in fetching"));
        setInterval(() => {
            axios
                .get("http://localhost:3000/admin/courses", {
                    headers: {
                        username: "sameer",
                        password: 123,
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    setCourses(response.data.courses);
                })
                .catch(() => console.log("error in fetching"));
        }, 1000);
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#eeeeee",
                height: "100vh",
            }}
        >
            <Typography
                align="center"
                variant="h4"
                style={{ paddingTop: 24, paddingBottom: 20 }}
            >
                Show Courses Page
            </Typography>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 24,
                    justifyContent: "center",
                }}
            >
                {courses.length !== 0
                    ? courses.map((course) => {
                          return <Course course={course} />;
                      })
                    : "No courses found :("}
            </div>
        </div>
    );
}

function Course({ course }) {
    const navigate = useNavigate();
    return (
        <Card variant="outlined" style={{ width: 300, padding: 12 }}>
            <Typography variant="h6" textAlign={"center"}>
                <u>{course.title}</u>
            </Typography>
            <br />
            <Typography variant="subtitle1">{course.description}</Typography>
            {course.imageLink ? (
                <img src={course.imageLink} style={{ width: 300 }} />
            ) : null}
            <br />
            <Typography variant="subtitle1">
                Price : Rs. {course.price}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate(`/course/${course._id}`);
                    }}
                >
                    Edit
                </Button>
            </div>
        </Card>
    );
}

export default ShowCourses;
