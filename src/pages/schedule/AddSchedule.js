import React, {useEffect, useState} from 'react';
import Button from './../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Field } from '../../components/Field';
import { Label } from '../../components/Label';
import axios from "axios";
import {InputChangeBackground} from "../../components/Input";
import InputSelected from "../../components/Input/InputSelected";

const AddSchedule = () => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    })
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedFilm, setSelectedFilm] = useState("");
    const [films, setFilms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [rooms, setRooms] = useState([]);

    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            startTime: startTime,
            endTime: endTime,
            filmId: selectedFilm,
            roomId: selectedRoom,
        };
        axios.post("https://localhost:7228/DMP/FilmSchedules", data, config)
            .then(res => {
                navigate("/schedule");
            })
    }
    useEffect(() => {
        axios.get("https://localhost:7228/DMP/Film", config).then((response) => {
            setFilms(response.data);
        });
    }, []);
    useEffect(() => {
        axios.get("https://localhost:7228/DMP/Room", config).then((response) => {
            setRooms(response.data);
        });
    }, []);
    const routeChange = () => {
        let path = "/schedule";
        navigate(path)
    }

    return (
        <div>
            <h1 className='mt-3 text-3xl font-medium text-center'>Thêm Lịch Chiếu</h1>
            <Button className="w-40 bg-red-500" onClick={routeChange}>Quay lại</Button>
            <form onSubmit={handleSubmit}>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Phim</Label>
                    <InputSelected value={selectedFilm} onChange={(e) => setSelectedFilm(e.target.value)} optionName="Chọn phim">
                        {films.data?.result?.map((film) => (
                            <option key={film.id} value={film.id}>
                                {film.name}
                            </option>
                        ))}
                    </InputSelected>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Rạp chiếu - Phòng Chiếu</Label>
                    <InputSelected value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} optionName="Chọn rạp chiếu - phòng chiếu">
                        {rooms.data?.result?.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name} - {room.theaterName}
                            </option>
                        ))}
                    </InputSelected>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Thời gian bắt đầu</Label>
                    <InputChangeBackground type="datetime-local" placeholder="Thời gian bắt đầu" id="name" onChange={(e)=> setStartTime(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Thời gian kết thúc</Label>
                    <InputChangeBackground type="datetime-local" placeholder="Thời gian bắt đầu" id="name" onChange={(e)=> setEndTime(e.target.value)}></InputChangeBackground>
                </Field>
                <Button className='float-right w-50 mt-3' type="submit">Thêm Lịch Chiếu</Button>
            </form>
        </div>
    );
};

export default AddSchedule;