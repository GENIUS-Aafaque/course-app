import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, TextField, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
    atom,
} from "recoil";

function UpdateCourse() {
    const setCourse = useSetRecoilState(courseState);
    const { courseId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/admin/course/${courseId}`, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setCourse(response.data.course);
            })
            .catch(() => console.log("error in fetching"));
    }, [courseId]);

    return (
        <div
            style={{
                backgroundColor: "#eeeeee",
                height: "100vh",
            }}
        >
            <TitleHeader />
            <br />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCourseCard courseId={courseId}></UpdateCourseCard>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard />
                </Grid>
            </Grid>
        </div>
    );
}

function TitleHeader() {
    const course = useRecoilValue(courseState);
    const title = course ? course.title : null;
    return (
        <div
            style={{
                height: 250,
                width: "100%",
                backgroundColor: "#212121",
                display: "grid",
                placeItems: "center",
                marginBottom: -250,
                zIndex: -1,
            }}
        >
            <Typography
                variant="h3"
                style={{ color: "white", fontWeight: 600 }}
            >
                {title}
            </Typography>
        </div>
    );
}

function CourseCard() {
    const course = useRecoilValue(courseState);
    if (course) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 300, padding: 12 }}>
                    <Typography variant="h6">{course.title}</Typography>
                    <br />
                    <Typography variant="subtitle">
                        {course.description}
                    </Typography>
                    {course.imageLink ? <img src={course.imageLink} /> : null}
                    <br />
                    <Typography variant="subtitle">
                        Price : Rs. {course.price}
                    </Typography>
                </Card>
            </div>
        );
    } else {
        return (
            <Typography align="center" variant="h4" style={{ paddingTop: 100 }}>
                No Courses Found
            </Typography>
        );
    }
}

function UpdateCourseCard(props) {
    const [course, setCourse] = useRecoilState(courseState);
    if (course) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card
                    variant="outlined"
                    style={{
                        marginTop: 200,
                        padding: 20,
                        width: 500,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        type={"text"}
                        name="title"
                        value={course.title}
                        onChange={(e) => {
                            setCourse((oldValue) => {
                                return {
                                    ...oldValue,
                                    [e.target.name]: e.target.value,
                                };
                            });
                        }}
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
                        onChange={(e) => {
                            setCourse((oldValue) => {
                                return {
                                    ...oldValue,
                                    [e.target.name]: e.target.value,
                                };
                            });
                        }}
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
                        onChange={(e) => {
                            setCourse((oldValue) => {
                                return {
                                    ...oldValue,
                                    [e.target.name]: e.target.value,
                                };
                            });
                        }}
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
                        onChange={(e) => {
                            setCourse((oldValue) => {
                                return {
                                    ...oldValue,
                                    [e.target.name]: e.target.value,
                                };
                            });
                        }}
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        onClick={() => {
                            axios
                                .put(
                                    `http://localhost:3000/admin/courses/${props.courseId}`,
                                    course,
                                    {
                                        headers: {
                                            authorization:
                                                "Bearer " +
                                                localStorage.getItem("token"),
                                        },
                                    }
                                )
                                .then(() => {
                                    alert("Course Updated Succeccfully");
                                });
                        }}
                    >
                        Update Course
                    </Button>
                </Card>
            </div>
        );
    }
}

export default UpdateCourse;

const courseState = atom({
    key: "courseState",
    default: undefined,
});
