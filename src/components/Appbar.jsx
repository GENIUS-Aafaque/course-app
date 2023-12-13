import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Appbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3000/admin/me", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setUsername(response.data.username);
            });
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    if (username) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 12,
                    backgroundColor: "#dddddd",
                    borderBottom: "2px solid #bbbbbb",
                }}
            >
                <div>
                    <Typography variant="h4">COURZERO</Typography>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Typography variant="h6">{username}</Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            window.location.href = "/";
                            localStorage.setItem("token", null);
                        }}
                    >
                        Log Out
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                backgroundColor: "#dddddd",
                borderBottom: "2px solid #bbbbbb",
            }}
        >
            <div>
                <Typography variant="h4">COURZERO</Typography>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                >
                    Sign Up
                </Button>
                <Button variant="contained" onClick={() => navigate("/login")}>
                    Sign In
                </Button>
            </div>
        </div>
    );
}

export default Appbar;
