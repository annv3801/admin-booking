import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Seat = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-seat")
    }
    const [film, setSeat] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://localhost:7228/DMP/Seat", config)
            .then(res => {
                const listSeat = res.data;
                setSeat(listSeat)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    // const handleDelete = (id) => {
    //     axios.delete("https://localhost:7228/DMP/Seat/" + id, config)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 window.location.reload()
    //             }
    //         })
    // }
    console.log(film)
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Ghế</h1>
            <Button className='w-40' onClick={routeChange}> Thêm Ghế</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Tên ghế</th>
                    <th className="px-6 py-3 text-center">Tên phòng</th>
                    <th className="px-6 py-3 text-center">Tên rạp</th>
                    <th className="px-6 py-3 text-center">Loại ghế</th>
                    <th className="px-6 py-3 text-center">Trạng thái</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {film.data?.result?.map((films) => {
                    return (
                        <tr className="border-b-2 " key={films.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{films.name}</td>
                            <td className="text-center">{films.roomName}</td>
                            <td className="text-center">{films.theaterName}</td>
                            <td className="text-center">{films.type}</td>
                            <td className="text-center">{films.status}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <div onClick={() => handleDelete(films.id)} className="bg-red-500 w-1/4 text-white rounded-lg cursor-pointer">Xóa</div>*/}
                            {/*</td>*/}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Seat;