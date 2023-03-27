import {Route, Routes} from "react-router-dom";
import React from "react";
import Layout from "./components/layout/Layout";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddCategory from "./pages/category/AddCategory";
import Category from "./pages/category/Category";
import Film from "./pages/film/Film";
import AddFilm from "./pages/film/AddFilm";
import Theater from "./pages/theater/Theater";
import AddTheater from "./pages/theater/AddTheater";
import Room from "./pages/room/Room";
import AddRoom from "./pages/room/AddRoom";
import Schedule from "./pages/schedule/Schedule";
import AddSchedule from "./pages/schedule/AddSchedule";
import AddSeat from "./pages/seat/AddSeat";
import Seat from "./pages/seat/Seat";
import Ticket from "./pages/ticket/Ticket";
import AddTicket from "./pages/ticket/AddTicket";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/customers" element={<Layout><Customers /></Layout>} />

            <Route path="/category" element={<Layout><Category /></Layout>} />
            <Route path="/add-category" element={<Layout><AddCategory /></Layout>} />

            <Route path="/film" element={<Layout><Film /></Layout>} />
            <Route path="/add-film" element={<Layout><AddFilm /></Layout>} />

            <Route path="/theater" element={<Layout><Theater /></Layout>} />
            <Route path="/add-theater" element={<Layout><AddTheater /></Layout>} />

            <Route path="/room" element={<Layout><Room /></Layout>} />
            <Route path="/add-room" element={<Layout><AddRoom /></Layout>} />

            <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
            <Route path="/add-schedule" element={<Layout><AddSchedule /></Layout>} />

            <Route path="/seat" element={<Layout><Seat /></Layout>} />
            <Route path="/add-seat" element={<Layout><AddSeat /></Layout>} />

                <Route path="/ticket" element={<Layout><Ticket /></Layout>} />
                <Route path="/add-ticket" element={<Layout><AddTicket /></Layout>} />

            <Route path="/login" element={<Login></Login>} />
        </Routes>
    );
}

export default App;