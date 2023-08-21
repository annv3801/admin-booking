import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Seat = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);

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
    const receivedSubmit = (id) => {
        axios.put(`https://cinema.dummywebsite.me/update-received-booking/${id}`, null, config)
            .then(res => {
                window.location.reload();
            });
    }
    const res = () => {
        axios.get("https://cinema.dummywebsite.me/view-list-booking-by-admin", config)
            .then(res => {
                const listBooking = res.data;
                setBooking(listBooking)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1


    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Ghế</h1>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-center">Số điện thoại người đặt</th>
                    <th className="px-6 py-3 text-center">Kiểu thanh toán</th>
                    <th className="px-6 py-3 text-center">Tổng tiền</th>
                    <th className="px-6 py-3 text-center">Nhận vé</th>
                    <th className="px-6 py-3 text-center">Danh sách ghế</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {booking.data?.result?.map((films) => {
                    return (
                        <tr className="border-b-2 " key={films.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{films.phoneNumber}</td>
                            <td className="text-center">{films.paymentMethod == 1 ? "Tiền mặt" : "Chuyển khoản"}</td>
                            <td className="text-center">{films.total}</td>
                            <td className="text-center">{films.isReceived == 1 ? "Đã nhận vé" : "Chưa nhận vé"}</td>
                            <td className="text-center">{films.listSeatName}</td>
                            <td className="text-center"><button onClick={() => receivedSubmit(films.id)} className={`text-white px-3 py-2 rounded-lg ${films.isReceived == 1 ? 'bg-red-500' : 'bg-green-500'}`} disabled={films.isReceived === 1 ? true : false}>Đã đặt ghế</button></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Seat;