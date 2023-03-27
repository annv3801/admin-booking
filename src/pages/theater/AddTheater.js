import React, {useEffect, useState} from 'react';
import Button from './../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Field } from '../../components/Field';
import { Label } from '../../components/Label';
import axios from "axios";
import {InputChangeBackground} from "../../components/Input";

const AddTheater = () => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    })
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            address: address,
            status: status
        };
        axios.post("https://localhost:7228/DMP/Theater", data, config)
            .then(res => {
                navigate("/theater");
            })
    }
    const routeChange = () => {
        let path = "/theater";
        navigate(path)
    }

    return (
        <div>
            <h1 className='mt-3 text-3xl font-medium text-center'>Thêm Địa Điểm</h1>
            <Button className="w-40 bg-red-500" onClick={routeChange}>Quay lại</Button>
            <form onSubmit={handleSubmit}>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Tên Địa Điểm</Label>
                    <InputChangeBackground placeholder="Nhập tên địa điểm" id="name" onChange={(e)=> setName(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='address'>Địa điểm</Label>
                    <InputChangeBackground placeholder="Nhập địa điểm" id="address" onChange={(e)=> setAddress(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='status'>Trạng thái</Label>
                    <InputChangeBackground placeholder="Nhập trạng thái" id="status" onChange={(e)=> setStatus(e.target.value)}></InputChangeBackground>
                </Field>
                <Button className='float-right w-40 mt-3' type="submit">Thêm Địa Điểm</Button>
            </form>
        </div>
    );
};

export default AddTheater;