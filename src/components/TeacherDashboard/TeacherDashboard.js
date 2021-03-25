import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
//import { FaUserPlus, FaBook, FaListAlt, FaEnvelope, FaHome } from 'react-icons/fa'
import MenuBarPlus from '../reusable/MenuBarPlus'
import TeacherHome from '../TeacherDashboard/TeacherHome'
import MemberProfile from '../TeacherDashboard/StudentProfile'
import ShowResult from '../TeacherDashboard/ShowResult'
import UploadResult from '../TeacherDashboard/UploadResult'


const TeacherDashboard = () => {

    const history = useHistory()

    function logUserOut(){
        localStorage.clear()
        history.push("/login")
    }

    let auth = localStorage.getItem("token")
    let userType = localStorage.getItem('memberType')

    return(
        <div className="admin-dashboard-container"> 
            
            <MenuBarPlus 
                homeRoute="/teacher/home" 
                profileRoute="/teacher/student-profile" 
                resultRoute="/teacher/result-view"
            />

            {auth && userType === "Teacher" ? <div className="teacher-dashboard-route">
                <Switch>
                    <Route path="/teacher/" exact component={TeacherHome}></Route>
                    <Route path="/teacher/home" component={TeacherHome}></Route>
                    <Route path="/teacher/student-profile" component={MemberProfile}></Route>
                    <Route path="/teacher/result-view" component={ShowResult}></Route>
                    <Route path="/teacher/result-upload" component={UploadResult}></Route>
                    <Redirect from="/teacher/:id" to="/teacher/" />
                </Switch>
            </div> : logUserOut()}
        </div> 
    )
}

export default TeacherDashboard