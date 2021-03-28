import React, {useEffect, useContext} from 'react'
import StateManager from '../stateManager/manager'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
//import { FaUserPlus, FaBook, FaListAlt, FaEnvelope, FaHome } from 'react-icons/fa'
import MenuBarPlus from '../components/reusable/MenuBarPlus'
import StudentHome from '../components/StudentDashboard/StudentHome'
import MyProfile from '../components/StudentDashboard/StudentProfile'
import ShowResult from "../components/StudentDashboard/ShowResult";


const StudentDashboard = () => {

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
                homeRoute="/student/home" 
                profileRoute="/student/student-profile" 
                resultRoute="/student/result-view" 
            />

            {auth && userType === "Student" ? <div className="teacher-dashboard-route">
                <Switch>
                    <Route path="/student/" exact component={StudentHome}></Route>
                    <Route path="/student/home" component={StudentHome}></Route>
                    <Route path="/student/student-profile" component={MyProfile}></Route>
                    <Route path="/student/result-view" component={ShowResult}></Route>
                    <Redirect from="/student/:id" to="/student/" />
                </Switch>
            </div> :  logUserOut()}
        </div> 
    )
}

export default StudentDashboard