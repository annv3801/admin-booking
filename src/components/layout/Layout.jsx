import React, {useEffect} from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'

import { useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'

const Layout = (props) => {

    const themeReducer = useSelector(state => state.ThemeReducer)
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    return (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            <Sidebar location={location} {...props}/>
            <div className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout
