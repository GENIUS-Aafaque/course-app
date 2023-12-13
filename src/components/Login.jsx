import axios from "axios";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const newLogin = () => {
        axios
            .post(
                "http://localhost:3000/admin/login",
                {},
                {
                    headers: {
                        username: email,
                        password: password,
                    },
                }
            )
            .then((response) => {
                setEmail("");
                setPassword("");
                localStorage.setItem("token", response.data.token);
                window.location.href = "/courses";
            });
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#eeeeee",
                paddingTop: "20vh",
            }}
        >
            <center>
                <Typography variant="h5">Welcome back! Login here.</Typography>
                <br />
                <Card variant="outlined" style={{ width: 400, padding: "2%" }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type={"text"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={"text"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={newLogin}>
                        Login
                    </Button>
                    <br />
                    <br />
                    <Typography fontSize={"caption"} variant="h6">
                        New user? <a href="/register">Register</a>
                    </Typography>
                </Card>
            </center>
        </div>
    );
}

export default Login;
