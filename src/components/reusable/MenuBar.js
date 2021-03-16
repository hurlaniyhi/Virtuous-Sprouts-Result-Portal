import React from 'react'
import {useHistory} from 'react-router-dom'
import {FaSignOutAlt } from 'react-icons/fa'
import logo from '../../assets/logo2.jpg'



const MenuBar = ({title}) =>{
    const history = useHistory()
    function handleLogout(){
        localStorage.clear()
        history.push("/")
    }
    return(
        <div className="nav-container">
            <img src={logo}  className="nav-logo" />
            <p className="page-title">{title}</p>
            <FaSignOutAlt className="nav-logout" onClick={handleLogout}/>
        </div>
    )
}

export default MenuBar