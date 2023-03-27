import React, {useEffect, useState} from 'react';
import Button from './../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Field } from '../../components/Field';
import { Label } from '../../components/Label';
import axios from "axios";
import {InputChangeBackground} from "../../components/Input";
import InputSelected from "../../components/Input/InputSelected";

const AddRoom = () => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    })
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [status, setStatus] = useState(1);
    const [selectedTheater, setSelectedTheater] = useState("");
    const [theaters, setTheaters] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            theaterId: selectedTheater,
            status: status
        };
        axios.post("https://localhost:7228/DMP/Room", data, config)
            .then(res => {
                navigate("/room");
            })
    }
    useEffect(() => {
        axios.get("https://localhost:7228/DMP/Theater", config).then((response) => {
            setTheaters(response.data);
        });
    }, []);
    const routeChange = () => {
        let path = "/room";
        navigate(path)
    }

    return (
        <div>
            <h1 className='mt-3 text-3xl font-medium text-center'>Thêm Phòng Chiếu</h1>
            <Button className="w-40 bg-red-500" onClick={routeChange}>Quay lại</Button>
            <form onSubmit={handleSubmit}>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Tên Phòng Chiếu</Label>
                    <InputChangeBackground placeholder="Nhập tên phòng chiếu" id="name" onChange={(e)=> setName(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='category'>Category</Label>
                    <InputSelected value={selectedTheater} onChange={(e) => setSelectedTheater(e.target.value)} optionName="Chọn rạp chiếu">
                        {theaters.data?.result?.map((theater) => (
                            <option key={theater.id} value={theater.id}>
                                {theater.name}
                            </option>
                        ))}
                    </InputSelected>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='status'>Trạng thái</Label>
                    <InputSelected onChange={(e) => setStatus(e.target.value)} optionName="Chọn trạng thái">
                        <option key={1} value={0}>Không Hoạt động</option>
                        <option key={1} value={1}>Hoạt động</option>
                    </InputSelected>
                </Field>
                <Button className='float-right w-40 mt-3' type="submit">Thêm Phòng Chiếu</Button>
            </form>
        </div>
    );
};

export default AddRoom;