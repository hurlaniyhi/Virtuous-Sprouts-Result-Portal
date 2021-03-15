import React from 'react'
import { useHistory } from "react-router-dom"

const AdminHome = () => {
    const history = useHistory()
    
    function handleNavigation(){
        history.push("/admin/add-member")
    }
    return(
        <div className="admin-home-container">
            <div className="home-intro-container">
                <p className="home-intro">Hi,</p>
                <p className="home-intro">This is Admin,</p>
            </div>
            <a className="add-member" onClick={handleNavigation}>Add New Member</a>
            <div className="bubble1"></div>
            <div className="bubble2"></div>
            <div className="bubble3"></div>
        </div>
    )
}
export default AdminHome