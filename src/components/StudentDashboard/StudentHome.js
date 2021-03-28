import React, {useEffect, useContext} from 'react'
import StateManager from '../../stateManager/manager'
import Home from '../reusable/Home'
import studentIllustrator from '../../assets/student.svg'

const StudentHome = () => {

    const {pageTitle} = useContext(StateManager)

    useEffect(()=>{
        document.title = "Student Home Page"
        pageTitle("Student Dashboard")
    }, [])
    
    let name = localStorage.getItem("firstName")

    return(
        <div style={{height: "100%"}}>
            <Home 
            navRoute="/student/student-profile" 
            containerClass="student-home-container"
            greeting={`Hello ${name},`}
            notification="Welcome"
            buttonText="View Profile"
            buttonClass="add-member button-down"
            introContainer="home-intro-container2 home-intro-container3"
            />
            <img src={studentIllustrator} className="teacher-illustrator"/>
        </div>
    )
}
export default StudentHome