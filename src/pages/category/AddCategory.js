import React, {useEffect, useState} from 'react';
import Button from './../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Field } from '../../components/Field';
import { Label } from '../../components/Label';
import axios from "axios";
import {InputChangeBackground} from "../../components/Input";

const AddCategory = () => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    })
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [shortenUrl, setShotenUrl] = useState("");
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
            shortenUrl: shortenUrl,
            status: status
        };
        axios.post("http://localhost:5233/create-category", data, config)
            .then(res => {
                navigate("/category");
            })
    }
    const routeChange = () => {
        let path = "/category";
        navigate(path)
    }

    return (
        <div>
            <h1 className='mt-3 text-3xl font-medium text-center'>Thêm Danh Mục</h1>
            <Button className="w-40 bg-red-500" onClick={routeChange}>Quay lại</Button>
            <form onSubmit={handleSubmit}>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Tên Danh Mục</Label>
                    <InputChangeBackground placeholder="Nhập tên danh mục" id="name" onChange={(e)=> setName(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='shortenUrl'>Url rút gọn</Label>
                    <InputChangeBackground placeholder="Nhập slug" id="shortenUrl" onChange={(e)=> setShotenUrl(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='status'>Trạng thái</Label>
                    <InputChangeBackground placeholder="Nhập trạng thái" id="status" onChange={(e)=> setStatus(e.target.value)}></InputChangeBackground>
                </Field>
                <Button className='float-right w-40 mt-3' type="submit">Thêm Danh Mục</Button>
            </form>
        </div>
    );
};

export default AddCategory;