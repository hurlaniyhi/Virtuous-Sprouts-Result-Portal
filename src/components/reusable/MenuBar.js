import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import {FaSignOutAlt } from 'react-icons/fa'
import {FiLogOut } from 'react-icons/fi'
import logo from '../../assets/logo2.jpg'



const MenuBar = ({title}) =>{
    const history = useHistory()
    const {signOut} = useContext(StateManager)

    function handleLogout(){
        signOut(history)
    }
    return(
        <div className="nav-container">
            <img src={logo}  className="nav-logo" />
            <p className="page-title">{title}</p>
            <FiLogOut className="nav-logout" onClick={handleLogout}/>
        </div>
    )
}

export default MenuBar