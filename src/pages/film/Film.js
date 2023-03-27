import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Film = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-film")
    }
    const [film, setFilm] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://localhost:7228/DMP/Film", config)
            .then(res => {
                const listFilm = res.data;
                setFilm(listFilm)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    // const handleDelete = (id) => {
    //     axios.delete("https://localhost:7228/DMP/Film/" + id, config)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 window.location.reload()
    //             }
    //         })
    // }
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Phim</h1>
            <Button className='w-40' onClick={routeChange}> Thêm Phim</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Tên</th>
                    <th className="px-6 py-3 text-center">Url rút gọn</th>
                    <th className="px-6 py-3 text-center">Mô tả</th>
                    <th className="px-6 py-3 text-center">Đạo diễn</th>
                    <th className="px-6 py-3 text-center">Diễn viên</th>
                    <th className="px-6 py-3 text-center">Thể loại</th>
                    <th className="px-6 py-3 text-center">Khởi chiếu</th>
                    <th className="px-6 py-3 text-center">Thời lượng</th>
                    <th className="px-6 py-3 text-center">Ngôn ngữ</th>
                    <th className="px-6 py-3 text-center">Rated</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {film.data?.result?.map((films) => {
                    return (
                        <tr className="border-b-2 " key={films.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{films.name}</td>
                            <td className="text-center">{films.shortenUrl}</td>
                            <td className="text-center">{films.description}</td>
                            <td className="text-center">{films.director}</td>
                            <td className="text-center">{films.actor}</td>
                            <td className="text-center">{films.genre}</td>
                            <td className="text-center">{films.premiere}</td>
                            <td className="text-center">{films.duration}</td>
                            <td className="text-center">{films.language}</td>
                            <td className="text-center">{films.rated}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <NavLink to={`/update-category/${categories._id}`} className="bg-green-500 w-1/4 text-white rounded-lg cursor-pointer">Sửa</NavLink>*/}
                            {/*</td>*/}
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

export default Film;