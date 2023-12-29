import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail";

function Appbar({}) {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    if (userLoading) {
        return <></>;
    }

    if (userEmail) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#dddddd",
                    borderBottom: "2px solid #bbbbbb",
                    padding: 8,
                    zIndex: 1,
                }}
            >
                <div
                    style={{ marginLeft: 10, cursor: "pointer" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <Typography variant={"h6"}>Coursera</Typography>
                </div>
                <div style={{ display: "flex", gap: 8, marginRight: 12 }}>
                    <div style={{ display: "flex", gap: 2 }}>
                        <div>
                            <Button
                                onClick={() => {
                                    navigate("/create-course");
                                }}
                            >
                                Add course
                            </Button>
                        </div>

                        <div>
                            <Button
                                onClick={() => {
                                    navigate("/courses");
                                }}
                            >
                                Courses
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                localStorage.setItem("token", null);
                                setUser({
                                    isLoading: false,
                                    userEmail: null,
                                });
                                navigate("/");
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#dddddd",
                    borderBottom: "2px solid #bbbbbb",
                    padding: 8,
                    zIndex: 1,
                }}
            >
                <div
                    style={{ marginLeft: 10, cursor: "pointer" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <Typography variant={"h6"}>COURZERO</Typography>
                </div>

                <div style={{ display: "flex", gap: 8, marginRight: 12 }}>
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Signup
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Signin
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Appbar;
