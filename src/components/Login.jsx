import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { userState } from "../store/atoms/user.js";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useRecoilState } from "recoil";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const newLogin = () => {
        axios
            .post(
                `${BASE_URL}/admin/login`,
                {},
                {
                    headers: {
                        username: email,
                        password: password,
                    },
                }
            )
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                setUser({
                    userEmail: email,
                    isLoading: false,
                });
                navigate("/courses");
            });
    };
    if (user.userEmail) {
        return (
            <Typography variant="h4" align="center" style={{ marginTop: 160 }}>
                You're already logged in.
            </Typography>
        );
    } else {
        return (
            <div style={{ paddingTop: "20vh" }}>
                <center>
                    <Typography variant="h5">
                        Welcome back! Login here.
                    </Typography>
                    <br />
                    <Card
                        variant="outlined"
                        style={{ width: 400, padding: "2%" }}
                    >
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
}

export default Login;
