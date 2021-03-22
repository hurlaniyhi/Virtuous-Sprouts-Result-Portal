import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { FaUserPlus, FaBook, FaListAlt, FaEnvelope, FaHome } from 'react-icons/fa'
import MenuBar from '../reusable/MenuBar'
import AdminHome from './AdminHome'
import SideMenu from '../reusable/SideMenu'
import RegisterMember from "./RegisterMember"
import StudentProfile from './StudentProfile'
import ShowResult from './ShowResult'


const AdminDashboard = () => {

    const history = useHistory()

    function logUserOut(){
        localStorage.clear()
        history.push("/login")
    }

    function handleMenu(type, route){

        var menuList = [
            {id: "home", navigation: "side"}, {id: "student-profile", navigation: "side"},
            {id: "student-result", navigation: "side"}, {id: "broadcast-mail", navigation: "side"},
            {id: "btm-home", navigation: "bottom"}, {id: "btm-student-profile", navigation: "bottom"},
            {id: "btm-student-result", navigation: "bottom"}, {id: "btm-broadcast-mail", navigation: "bottom"}
        ]
    
        for(let pickMenu of menuList){
            if(type === pickMenu.id){
                if(pickMenu.navigation === "side"){
                    document.querySelector(`#${pickMenu.id}`).className = "menu-div-trick"
                }
                else{
                    document.querySelector(`#${pickMenu.id}`).className = "bottom-icon-container-trick"
                }
            }
            else{
                if(pickMenu.navigation === "side"){
                    document.querySelector(`#${pickMenu.id}`).className = "menu-div"
                }
                else{
                    document.querySelector(`#${pickMenu.id}`).className = "bottom-icon-container"
                }
            }
        }

        history.push(`/admin/${route}`)   
    }

    let auth = localStorage.getItem("token")
    let userType = localStorage.getItem('memberType')

    return(
        <div className="admin-dashboard-container">
            
            <MenuBar title="Virtuous Sprout"/>
            {/* <div className="open-side-bar"></div> */}

            {auth && (userType === "Admin")  ? <div className="bottom-nav-container">
                <div className="bottom-icon-container" id="btm-home" onClick={()=>handleMenu("btm-home", "home")}>
                    <FaHome style={{fontSize:"2.5rem"}} className="bottom-menu-icon" />
                    <p className="bottom-menu-label">Home</p>
                </div>
                <div className="bottom-icon-container" id="btm-student-profile" onClick={()=>handleMenu("btm-student-profile", "member-profile")}>
                    <FaBook className="bottom-menu-icon" />
                    <p className="bottom-menu-label">Member Profile</p>
                </div>
                <div className="bottom-icon-container" id="btm-student-result" onClick={()=>handleMenu("btm-student-result", "add-member")}>
                    <FaListAlt className="bottom-menu-icon" />
                    <p className="bottom-menu-label">Add Member</p>
                </div>
                <div className="bottom-icon-container" id="btm-broadcast-mail" onClick={()=>handleMenu("btm-broadcast-mail", "add-member")}>
                    <FaEnvelope className="bottom-menu-icon" />
                    <p className="bottom-menu-label">Broadcast Mail</p>
                </div>
            </div> : null}
            {auth && (userType === "Admin") ? <div className="create-dashboard">
                <SideMenu>
                    <div className="menu-div" id="home" onClick={()=>handleMenu("home", "home")}>
                        <FaHome style={{fontSize:"2.5rem"}} className="menu-icon" />
                        <p className="menu-label">Home</p>
                    </div>
                    <div className="menu-div" id="student-profile" onClick={()=>handleMenu("student-profile", "member-profile")}>
                        <FaBook className="menu-icon" />
                        <p className="menu-label">Member Profile</p>
                    </div>
                    <div className="menu-div" id="student-result" onClick={()=>handleMenu("student-result", "add-member")}>
                        <FaListAlt className="menu-icon" />
                        <p className="menu-label">Add Member</p>
                    </div>
                    <div className="menu-div" id="broadcast-mail" onClick={()=>handleMenu("broadcast-mail", "result-view")}>
                        <FaEnvelope className="menu-icon" />
                        <p className="menu-label">Broadcast Mail</p>
                    </div>
                </SideMenu>

                <div className="sub-routes">
                    <Switch>
                        <Route path="/admin/" exact component={AdminHome}></Route>
                        <Route path="/admin/home" component={AdminHome}></Route>
                        <Route path="/admin/add-member" component={RegisterMember}></Route>
                        <Route path="/admin/member-profile" component={StudentProfile}></Route>
                        <Route path="/admin/edit-profile" component={RegisterMember}></Route>
                        <Route path="/admin/result-view" component={ShowResult}></Route>
                        <Redirect from="/admin/:id" to="/admin/" />
                    </Switch>
                </div>
            </div> : logUserOut()}
        </div> 
    )
}

export default AdminDashboard