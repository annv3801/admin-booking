import React, {useState} from 'react'
import './topnav.css'
import {Link, useNavigate} from 'react-router-dom'
import ThemeMenu from '../thememenu/ThemeMenu'
import user_image from '../../assets/images/tuat.png'
const curr_user = {
    display_name: 'Tuat Tran',
    image: user_image
}

const Topnav = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <div className="flex">
                        <span className='text-green-400 pt-2 pr-4'>An</span>
                        <div className="inline-flex theme-mode-dark theme-color-red border rounded-md" onClick={() => setDropdownMenu(!dropdownMenu)}>
                            <a href="# " className="px-4 py-2 text-sm hover:text-gray-700 hover:bg-gray-50 rounded-l-md" >
                                Menu
                            </a>
                            <div className={`${dropdownMenu ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} relative transition-all`}>
                                <div className="absolute right-0 z-10 w-56 mt-3 origin-top-right theme-mode-dark theme-color-red border border-gray-100 rounded-md shadow-lg cursor-pointer hover:text-gray-700 hover:bg-gray-50">
                                    <div className="p-2">
                                        <div className="block px-4 py-2 text-sm rounded-lg" onClick={() => handleLogout()}>Logout</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu/>
                </div>
            </div>
        </div>
    )
}

export default Topnav
