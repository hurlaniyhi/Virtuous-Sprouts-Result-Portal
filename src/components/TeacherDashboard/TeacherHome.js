import React, {useEffect, useContext} from 'react'
import Home from '../reusable/Home'
import StateManager from '../../stateManager/manager'
import teacherIllustrator from '../../assets/teacher.svg'

const TeacherHome = () => {
    
    let name = localStorage.getItem("firstName")

    const {state, handleResultUploadData, pageTitle} = useContext(StateManager)

    useEffect(()=>{
        resolveResultIssue()
        document.title = "Teacher Home Page"
        pageTitle("Teacher Dashboard")
    }, [])

    async function resolveResultIssue(){
        handleResultUploadData({session: "", term: "", resultType: "", studentClass: "", resultId: null,
        studentName: "", result: null})
    }

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