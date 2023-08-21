import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Ticket = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-ticket")
    }
    const [ticket, setTicket] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://cinema.dummywebsite.me/view-list-ticket", config)
            .then(res => {
                const listTicket = res.data;
                setTicket(listTicket)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    // const handleDelete = (id) => {
    //     axios.delete("https://localhost:7228/DMP/Ticket/" + id, config)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 window.location.reload()
    //             }
    //         })
    // }
    console.log(ticket)
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Vé</h1>
            <Button className='w-40' onClick={routeChange}> Thêm Vé</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Tên</th>
                    <th className="px-6 py-3 text-center">Lịch chiếu</th>
                    <th className="px-6 py-3 text-center">Giá</th>
                    <th className="px-6 py-3 text-center">Loại vé</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {ticket.data?.result?.map((tickets) => {
                    return (
                        <tr className="border-b-2 " key={tickets.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{tickets.name}</td>
                            <td className="text-center">{tickets.scheduleId}</td>
                            <td className="text-center">{tickets.price}</td>
                            <td className="text-center">{tickets.type}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <NavLink to={`/update-category/${categories._id}`} className="bg-green-500 w-1/4 text-white rounded-lg cursor-pointer">Sửa</NavLink>*/}
                            {/*</td>*/}
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <div onClick={() => handleDelete(tickets.id)} className="bg-red-500 w-1/4 text-white rounded-lg cursor-pointer">Xóa</div>*/}
                            {/*</td>*/}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Ticket;