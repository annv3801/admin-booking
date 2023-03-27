import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {InputChangeBackground} from "../components/Input";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    }, [])

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <InputChangeBackground></InputChangeBackground>
        </div>
    )
}

export default Dashboard
