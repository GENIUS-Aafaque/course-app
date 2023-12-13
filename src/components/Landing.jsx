import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eeeeee",
            }}
        >
            <Card
                variant="outlined"
                style={{
                    width: 400,
                    padding: 60,
                    marginTop: -100,
                    outlineWidth: 4,
                }}
            >
                <Typography
                    variant="h4"
                    style={{ flex: "1", color: "#aaaaaa" }}
                >
                    <u>Welcome to COURZERO!</u>
                </Typography>
                <br />
                <br />
                <br />
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 64,
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Landing;
