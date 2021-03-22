import React from 'react'
import Home from '../reusable/Home'
import teacherIllustrator from '../../assets/teacher.svg'

const TeacherHome = () => {
    
    let name = localStorage.getItem("firstName")

    return(
        <div style={{height: "100%"}}>
            <Home 
            navRoute="/teacher/student-profile" 
            containerClass="teacher-home-container"
            greeting={`Hello ${name},`}
            notification="Welcome"
            buttonText="Student Profile"
            buttonClass="add-member button-down"
            introContainer="home-intro-container2"
            />
            <img src={teacherIllustrator} className="teacher-illustrator"/>
        </div>
    )
}
export default TeacherHome