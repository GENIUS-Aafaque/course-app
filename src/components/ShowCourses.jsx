import { useState, useEffect } from "react";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading.jsx";

function ShowCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/admin/courses`, {
                headers: {
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

    if (courses) {
        return (
            <div>
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
    } else {
        return <Loading />;
    }
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
