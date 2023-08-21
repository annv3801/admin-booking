import React, {useEffect, useState} from 'react';
import Button from './../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { Field } from '../../components/Field';
import { Label } from '../../components/Label';
import axios from "axios";
import {InputChangeBackground} from "../../components/Input";
import InputSelected from "../../components/Input/InputSelected";

const AddFilm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [shortenUrl, setShotenUrl] = useState("");
    const [description, setDescription] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [actor, setActor] = useState("");
    const [premiere, setPremiere] = useState("");
    const [duration, setDuration] = useState("");
    const [language, setLanguage] = useState("");
    const [rated, setRated] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

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
        const data = new FormData();
        data.append("name", name);
        data.append("shortenUrl", shortenUrl);
        data.append("categoryId", selectedCategory);
        data.append("description", description);
        data.append("director", director);
        data.append("actor", actor);
        data.append("genre", genre);
        data.append("premiere", premiere);
        data.append("duration", duration);
        data.append("language", language);
        data.append("rated", rated);
        data.append(
            "image",
            document.getElementById("image").files[0],
        );

        axios.post("https://cinema.dummywebsite.me/create-film", data, config, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                navigate("/film");
            })
    }
    useEffect(() => {
        axios.get("https://cinema.dummywebsite.me/view-list-category", config).then((response) => {
            setCategories(response.data);
        });
    }, []);

    const routeChange = () => {
        let path = "/film";
        navigate(path)
    }

    return (
        <div>
            <h1 className='mt-3 text-3xl font-medium text-center'>Thêm Danh Mục</h1>
            <Button className="w-40 bg-red-500" onClick={routeChange}>Quay lại</Button>
            <form onSubmit={handleSubmit} >
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='name'>Tên Danh Mục</Label>
                    <InputChangeBackground placeholder="Nhập tên danh mục" id="name" onChange={(e)=> setName(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='shortenUrl'>Url rút gọn</Label>
                    <InputChangeBackground placeholder="Nhập url rút gọn" id="shortenUrl" onChange={(e)=> setShotenUrl(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='shortenUrl'>Hình ảnh</Label>
                    <InputChangeBackground type="file" id="image"></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='description'>Mô tả</Label>
                    <InputChangeBackground placeholder="Nhập mô tả" id="description" onChange={(e)=> setDescription(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='category'>Category</Label>
                    <InputSelected value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} optionName="Chọn danh mục">
                        {categories.data?.result?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </InputSelected>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='director'>Đạo diễn</Label>
                    <InputChangeBackground placeholder="Nhập đạo diễn" id="director" onChange={(e)=> setDirector(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='actor'>Diễn viên</Label>
                    <InputChangeBackground placeholder="Nhập diễn viên" id="actor" onChange={(e)=> setActor(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='genre'>Thể loại</Label>
                    <InputChangeBackground placeholder="Nhập thể loại" id="genre" onChange={(e)=> setGenre(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='premiere'>Khởi chiếu</Label>
                    <InputChangeBackground placeholder="Nhập khởi chiếu" id="premiere" onChange={(e)=> setPremiere(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='duration'>Thời lượng</Label>
                    <InputChangeBackground placeholder="Nhập thời lượng" id="duration" onChange={(e)=> setDuration(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='language'>Ngôn ngữ</Label>
                    <InputChangeBackground placeholder="Nhập ngôn ngữ" id="language" onChange={(e)=> setLanguage(e.target.value)}></InputChangeBackground>
                </Field>
                <Field className='mt-3'>
                    <Label className='text-lg' htmlFor='rated'>Rated</Label>
                    <InputChangeBackground placeholder="Nhập rated" id="rated" onChange={(e)=> setRated(e.target.value)}></InputChangeBackground>
                </Field>
                <Button className='float-right w-40 mt-3' type="submit">Thêm Danh Mục</Button>
            </form>
        </div>
    );
};

export default AddFilm;