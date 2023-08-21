import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Room = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-room")
    }
    const [room, setRoom] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://cinema.dummywebsite.me/view-list-room", config)
            .then(res => {
                const listRoom = res.data;
                setRoom(listRoom)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    const handleDelete = (id) => {
        axios.delete("https://cinema.dummywebsite.me/delete-room" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Phòng Chiếu</h1>
            <Button className='w-40' onClick={routeChange}> Thêm Phòng Chiếu</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Tên phòng chiếu</th>
                    <th className="px-6 py-3 text-center">Tên Rạp Chiếu</th>
                    <th className="px-6 py-3 text-center">Địa Điểm Rạp Chiếu</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {room.data?.result?.map((rooms) => {
                    return (
                        <tr className="border-b-2 " key={rooms.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{rooms.name}</td>
                            <td className="text-center">{rooms.theaterName}</td>
                            <td className="text-center">{rooms.theaterAddress}</td>
                            <td className="text-center">{rooms.status}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <NavLink to={`/update-category/${rooms._id}`} className="bg-green-500 w-1/4 text-white rounded-lg cursor-pointer">Sửa</NavLink>*/}
                            {/*</td>*/}
                            <td className="justify-center text-center flex">
                                <div onClick={() => handleDelete(rooms.id)} className="bg-red-500 w-1/4 text-white rounded-lg cursor-pointer">Xóa</div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Room;