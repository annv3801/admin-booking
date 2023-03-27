import React, {useEffect, useState} from 'react';
import Button from './../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Field } from '../../components/Field';
import { Label } from '../../components/Label';
import axios from "axios";
import {InputChangeBackground} from "../../components/Input";
import InputSelected from "../../components/Input/InputSelected";

const AddTicket = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [schedules, setSchedule] = useState([]);

    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    }, [])
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            price: price,
            scheduleId: selectedSchedule,
            type: type,

        };
        axios.post("https://localhost:7228/DMP/Ticket", data, config)
            .then(res => {
                navigate("/film");
            })
    }
    useEffect(() => {
        axios.get("https://localhost:7228/DMP/FilmSchedules", config).then((response) => {
            setSchedule(response.data);
            console.log(response.data)
        });
    }, []);

    const routeChange = () => {
        let path = "/ticket";
        navigate(path)
    }
    return (
        <div>
            <h1 className='mt-3 text-3xl font-medium text-center'>Thêm Vé</h1>
            <Button className="w-40 bg-red-500" onClick={routeChange}>Quay lại</Button>
            <form onSubmit={handleSubmit}>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Tên Vé</Label>
                    <InputChangeBackground placeholder="Nhập tên danh mục" id="name" onChange={(e)=> setName(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='schedule'>Category</Label>
                    <InputSelected value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} optionName="Chọn danh mục">
                        {schedules.data?.result?.map((schedule) => (
                            <option key={schedule.id} value={schedule.id}>
                                {schedule.filmName} - {schedule.roomName} - {schedule.theaterName} - {new Date(schedule.startTime).toLocaleDateString('en-GB')}, {new Date(schedule.startTime).toLocaleTimeString('en-GB', {hour12: false,})} - {new Date(schedule.endTime).toLocaleDateString('en-GB')}, {new Date(schedule.endTime).toLocaleTimeString('en-GB', {hour12: false,})}
                            </option>
                        ))}
                    </InputSelected>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='price'>Giá</Label>
                    <InputChangeBackground placeholder="Nhập giá" id="price" onChange={(e)=> setPrice(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='type'>Loại vé</Label>
                    <InputChangeBackground placeholder="Nhập loại vé" id="type" onChange={(e)=> setType(e.target.value)}></InputChangeBackground>
                </Field>
                <Button className='float-right w-40 mt-3' type="submit">Thêm Vé</Button>
            </form>
        </div>
    );
};

export default AddTicket;