import React, {useEffect, useState} from 'react';
import Button from "../../components/Button/Button";
import {Label} from "../../components/Label";
import {Field} from "../../components/Field";
import {InputChangeBackground} from "../../components/Input";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import InputSelected from "../../components/Input/InputSelected";

const AddSeat = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    })
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const type1 = 1
    const [numRows1, setNumRows1] = useState(0);
    const [numSeatsPerRow1, setNumSeatsPerRow1] = useState(0);

    const type2 = 2
    const [numRows2, setNumRows2] = useState(0);
    const [numSeatsPerRow2, setNumSeatsPerRow2] = useState(0);

    const type3 = 3
    const [numRows3, setNumRows3] = useState(0);
    const [numSeatsPerRow3, setNumSeatsPerRow3] = useState(0);

    const [selectedRoom, setSelectedRoom] = useState("");
    const [rooms, setRooms] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const seats = [];
        const numRowsInt1 = parseInt(numRows1);
        const numSeatsPerRowInt1 = parseInt(numSeatsPerRow1);

        const numRowsInt2 = parseInt(numRows2);
        const numSeatsPerRowInt2 = parseInt(numSeatsPerRow2);

        const numRowsInt3 = parseInt(numRows3);
        const numSeatsPerRowInt3 = parseInt(numSeatsPerRow3);

        // Loop through rows and seats to create seat names
        for (let i = 0; i < numRowsInt1; i++) {
            const rowName = String.fromCharCode(65 + i);
            for (let j = 1; j <= numSeatsPerRowInt1; j++) {
                const seatName = `${rowName}${j}`;
                seats.push({ name: seatName, type: type1 });
            }
        }

        // Loop through rows and seats to create seat names with a different type and price
        for (let i = 0; i < numRowsInt2; i++) {
            const rowName = String.fromCharCode(65 + numRowsInt1 + i);
            for (let j = 1; j <= numSeatsPerRowInt2; j++) {
                const seatName = `${rowName}${j}`;
                seats.push({ name: seatName, type: type2 });
            }
        }

        // Loop through rows and seats to create seat names with a different type and price
        for (let i = 0; i < numRowsInt3; i++) {
            const rowName = String.fromCharCode(65 + numRowsInt1 + numRowsInt2 + i);
            for (let j = 1; j <= numSeatsPerRowInt3; j++) {
                const seatName = `${rowName}${j}`;
                seats.push({ name: seatName, type: type3 });
            }
        }

        for (let i = 0; i < seats.length; i++) {
            const data = {
                scheduleId: selectedRoom,
                name: seats[i].name,
                type: seats[i].type,
                status: 1
            };
            axios.post("http://localhost:5233/create-seat", data, config)
                .then(res => {
                    navigate("/seat");
                })
        }
    };

    useEffect(() => {
        axios.get("http://localhost:5233/view-list-schedule", config).then((response) => {
            setRooms(response.data);
        });
    }, []);

    console.log(rooms)

    return (
        <form onSubmit={handleSubmit}>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Phòng</Label>
                <InputSelected value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} optionName="Chọn phòng">
                    {rooms.data?.result?.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.roomName} - {room.theaterName}
                        </option>
                    ))}
                </InputSelected>
            </Field>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Số lượng hàng ghế thường</Label>
                <InputChangeBackground min={0} type="number" placeholder="Nhập số lượng ghế thường" id="name" value={numRows1} onChange={(event) => setNumRows1(event.target.value)}></InputChangeBackground>
            </Field>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Số lượng ghế thường mỗi hàng</Label>
                <InputChangeBackground min={0} type="number" placeholder="Nhập số lượng ghế thường" id="name" value={numSeatsPerRow1} onChange={(event) => setNumSeatsPerRow1(event.target.value)}></InputChangeBackground>
            </Field>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Số lượng hàng ghế vip</Label>
                <InputChangeBackground min={0} type="number" placeholder="Nhập số lượng ghế vip" id="name" value={numRows2} onChange={(event) => setNumRows2(event.target.value)}></InputChangeBackground>
            </Field>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Số lượng ghế vip mỗi hàng</Label>
                <InputChangeBackground min={0} type="number" placeholder="Nhập số lượng ghế vip" id="name" value={numSeatsPerRow2} onChange={(event) => setNumSeatsPerRow2(event.target.value)}></InputChangeBackground>
            </Field>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Số lượng hàng ghế tình nhân</Label>
                <InputChangeBackground min={0} type="number" placeholder="Nhập số lượng ghế tình nhân" id="name" value={numRows3} onChange={(event) => setNumRows3(event.target.value)}></InputChangeBackground>
            </Field>
            <Field className='mt-3'>
                <Label className='text-lg' htmlFor='name'>Số lượng ghế tình nhân mỗi hàng</Label>
                <InputChangeBackground min={0} type="number" placeholder="Nhập số lượng ghế tình nhân" id="name" value={numSeatsPerRow3} onChange={(event) => setNumSeatsPerRow3(event.target.value)}></InputChangeBackground>
            </Field>
            <Button className='float-right w-50 mt-3' type="submit">Thêm Lịch Chiếu</Button>
        </form>
    );
};

export default AddSeat;