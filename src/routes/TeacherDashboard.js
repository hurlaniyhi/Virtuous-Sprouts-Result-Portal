import React, {useContext, useEffect} from 'react'
import StateManager from '../stateManager/manager'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
//import { FaUserPlus, FaBook, FaListAlt, FaEnvelope, FaHome } from 'react-icons/fa'
import MenuBarPlus from '../components/reusable/MenuBarPlus'
import TeacherHome from '..//components/TeacherDashboard/TeacherHome'
import MemberProfile from '../components/TeacherDashboard/StudentProfile'
import ShowResult from '../components/TeacherDashboard/ShowResult'
import UploadResult from '../components/TeacherDashboard/UploadResult'


const TeacherDashboard = () => {

    const history = useHistory()

    const {state, recoverUser} = useContext(StateManager)

    useEffect(()=>{
        handleUserRecovery()
    }, [])

    async function handleUserRecovery(){
        await recoverUser()
     }

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