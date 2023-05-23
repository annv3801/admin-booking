import React, {useEffect, useState} from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/add-category")
    }
    const [category, setCategory] = useState([]);
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("http://localhost:5233/view-list-category", config)
            .then(res => {
                const listCategory = res.data;
                setCategory(listCategory)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    // const handleDelete = (id) => {
    //     axios.delete("http://localhost:8000/v1/category/" + id, config)
    //     window.location.reload()
    // }
    let stt = 1
    const handleDelete = (id) => {
        axios.delete("http://localhost:5233/delete-category/" + id, config)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
    }
    return (
        <div>
            <h1 className="mt-3 text-3xl font-medium text-center">Quản lý Danh Mục</h1>
            <Button className='w-40' onClick={routeChange}> Thêm Danh Mục</Button>
            <table className="w-full mt-3 table-auto min-w-max ">
                <thead>
                <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2">
                    <th className="px-6 py-3 text-left"></th>
                    <th className="px-6 py-3 text-center">Title</th>
                    <th className="px-6 py-3 text-center">Slug</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-center">Quản lý</th>
                </tr>
                </thead>
                <tbody >
                {category.data?.result?.map((categories) => {
                    return (
                        <tr className="border-b-2 " key={categories.id}>
                            <td>{stt++}</td>
                            <td className="text-center">{categories.name}</td>
                            <td className="text-center">{categories.shortenUrl}</td>
                            <td className="text-center">{categories.status}</td>
                            {/*<td className="justify-center text-center flex">*/}
                            {/*    <NavLink to={`/update-category/${categories._id}`} className="bg-green-500 w-1/4 text-white rounded-lg cursor-pointer">Sửa</NavLink>*/}
                            {/*</td>*/}
                            <td className="justify-center text-center flex">
                                <div onClick={() => handleDelete(categories.id)} className="bg-red-500 w-1/4 text-white rounded-lg cursor-pointer">Xóa</div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Category;