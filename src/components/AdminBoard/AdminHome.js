import React from 'react'
import Home from '../reusable/Home'

const AdminHome = () => {
    
    return(
        <Home 
        navRoute="/admin/add-member" 
        containerClass="admin-home-container"
        greeting="Hi,"
        notification="This is Admin."
        buttonText="Add New Member"
        buttonClass="add-member"
        introContainer="home-intro-container"
        />
    )
}
export default AdminHome