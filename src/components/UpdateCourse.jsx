import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { Card, Typography, TextField, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
    atom,
    useRecoilCallback,
} from "recoil";
import { courseState } from "../store/atoms/course.js";
import {
    courseTitle,
    courseDescription,
    courseImage,
    coursePrice,
    courseDetails,
    isCourseLoading,
} from "../store/selectors/course.js";

function UpdateCourse() {
    const setCourse = useSetRecoilState(courseState);
    const { courseId } = useParams();
    const courseLoading = useRecoilValue(isCourseLoading);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/admin/course/${courseId}`, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setCourse({
                    courseLoading: false,
                    course: response.data.course,
                });
            })
            .catch(() => {
                setCourse({ courseLoading: false, course: null });
            });
    }, [courseId]);

    if (courseLoading) {
        return <></>;
    }

    return (
        <div>
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
    const title = useRecoilValue(courseTitle);

    if (title) {
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
    } else {
        return (
            <Typography align="center" variant="h4" style={{ paddingTop: 100 }}>
                No Courses Found
            </Typography>
        );
    }
}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const description = useRecoilValue(courseDescription);
    const imageLink = useRecoilValue(courseImage);
    const price = useRecoilValue(coursePrice);
    if (title) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 300, padding: 12 }}>
                    <Typography variant="h6">{title}</Typography>
                    <br />
                    <Typography variant="subtitle">{description}</Typography>
                    {imageLink ? <img src={imageLink} /> : null}
                    <br />
                    <Typography variant="subtitle">
                        Price : Rs. {price}
                    </Typography>
                </Card>
            </div>
        );
    }
}

function UpdateCourseCard(props) {
    const [course, setCourse] = useRecoilState(courseState);
    const [courseDetails, setCourseDetails] = useState(course.course);

    function courseDetailsUpdate(e) {
        setCourseDetails((oldValue) => {
            return {
                ...oldValue,
                [e.target.name]: e.target.value,
            };
        });
    }

    const courseUpdateCallback = async () => {
        await axios.put(
            `http://localhost:3000/admin/courses/${props.courseId}`,
            courseDetails,
            {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );

        setCourse({
            isLoading: false,
            course: courseDetails,
        });
        alert("Course Updated Successfully");
    };

    if (courseDetails) {
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
                        value={courseDetails.title}
                        onChange={courseDetailsUpdate}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        type={"text"}
                        name="description"
                        value={courseDetails.description}
                        onChange={courseDetailsUpdate}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Image Link"
                        variant="outlined"
                        type={"text"}
                        name="imageLink"
                        value={courseDetails.imageLink}
                        onChange={courseDetailsUpdate}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        type={"number"}
                        name="price"
                        value={courseDetails.price}
                        onChange={courseDetailsUpdate}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={courseUpdateCallback}>
                        Update Course
                    </Button>
                </Card>
            </div>
        );
    }
}

export default UpdateCourse;
