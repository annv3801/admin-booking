import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Schedule = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-schedule")
    }
    const [schedule, setSchedule] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://localhost:7228/DMP/FilmSchedules", config)
            .then(res => {
                const listSchedule = res.data;
                setSchedule(listSchedule)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    const handleDelete = (id) => {
        axios.delete("https://localhost:7228/DMP/FilmSchedules/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Lịch Chiếu</h1>
            <Button className='w-50' onClick={routeChange}> Thêm Lịch Chiếu</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Tên phim</th>
                    <th className="px-6 py-3 text-center">Tên phòng chiếu</th>
                    <th className="px-6 py-3 text-center">Tên rạp chiếu</th>
                    <th className="px-6 py-3 text-center">Thời gian bắt đầu</th>
                    <th className="px-6 py-3 text-center">Thời gian kết thúc</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {schedule.data?.result?.map((schedules) => {
                    return (
                        <tr className="border-b-2 " key={schedules.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{schedules.filmName}</td>
                            <td className="text-center">{schedules.roomName}</td>
                            <td className="text-center">{schedules.theaterName}</td>
                            <td className="text-center">{new Date(schedules.startTime).toLocaleDateString('en-GB')} - {new Date(schedules.startTime).toLocaleTimeString('en-GB', {hour12: false,})}</td>
                            <td className="text-center">{new Date(schedules.endTime).toLocaleDateString('en-GB')} - {new Date(schedules.endTime).toLocaleTimeString('en-GB', {hour12: false,})}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <NavLink to={`/update-category/${schedules._id}`} className="bg-green-500 w-1/4 text-white rounded-lg cursor-pointer">Sửa</NavLink>*/}
                            {/*</td>*/}
                            <td className="justify-center text-center flex">
                                <div onClick={() => handleDelete(schedules.id)} className="bg-red-500 w-1/4 text-white rounded-lg cursor-pointer">Xóa</div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;