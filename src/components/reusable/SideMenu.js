import React from 'react'
import logo from '../../assets/logo2.jpg'


const SideMenu = ({children}) => {
    return(
        <div className="side-menu-container">
            <img className="side-menu-logo" src={logo} />
            {children}
        </div>
    )
}

export default SideMenu