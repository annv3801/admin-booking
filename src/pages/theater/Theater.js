import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Theater = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-theater")
    }
    const [theater, setTheater] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://cinema.dummywebsite.me/view-list-theater", config)
            .then(res => {
                const listTheater = res.data;
                setTheater(listTheater)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    const handleDelete = (id) => {
        axios.delete("https://localhost:7228/DMP/Theater/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Rạp Chiếu</h1>
            <Button className='w-40' onClick={routeChange}> Thêm Rạp Chiếu</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Tên rạp chiếu</th>
                    <th className="px-6 py-3 text-center">Địa điểm</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {theater.data?.result?.map((theaters) => {
                    return (
                        <tr className="border-b-2 " key={theaters.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{theaters.name}</td>
                            <td className="text-center">{theaters.address}</td>
                            <td className="text-center">{theaters.status}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <NavLink to={`/update-category/${theaters._id}`} className="bg-green-500 w-1/4 text-white rounded-lg cursor-pointer">Sửa</NavLink>*/}
                            {/*</td>*/}
                            <td className="justify-center text-center flex">
                                <div onClick={() => handleDelete(theaters.id)} className="bg-red-500 w-1/4 text-white rounded-lg cursor-pointer">Xóa</div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Theater;