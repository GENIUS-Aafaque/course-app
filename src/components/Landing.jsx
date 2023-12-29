import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { userEmailState } from "../store/selectors/userEmail";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";

export const Landing = () => {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    return (
        <div>
            <Grid container style={{ padding: "5vw" }}>
                <Grid item xs={12} md={6} lg={6}>
                    <div style={{ marginTop: 100 }}>
                        <Typography variant={"h2"}>Courzero Admin</Typography>
                        <Typography variant={"h5"}>
                            A place to learn from Zero and become a Hero
                        </Typography>
                        {!userLoading && !userEmail && (
                            <div style={{ display: "flex", marginTop: 20 }}>
                                <div style={{ marginRight: 10 }}>
                                    <Button
                                        size={"large"}
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
                                        size={"large"}
                                        variant={"contained"}
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                    >
                                        Signin
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div></div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
                    <img src={"/class.jpg"} width={"100%"} />
                </Grid>
            </Grid>
        </div>
    );
};
