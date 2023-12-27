import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Landing } from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import Appbar from "./components/Appbar";
import UpdateCourse from "./components/UpdateCourse";
import "./App.css";
import { userState } from "./store/atoms/user.js";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "./config.js";
import { useEffect } from "react";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Appbar />
                <InitUser />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<CreateCourse />} />
                    <Route path="/courses" element={<ShowCourses />} />
                    <Route
                        path="/course/:courseId"
                        element={<UpdateCourse />}
                    />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/me`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username,
                });
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null,
                });
            }
        } catch (e) {
            setUser({
                isLoading: false,
                userEmail: null,
            });
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>;
}

export default App;
