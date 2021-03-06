import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import {helpers} from '../../helpers/helpers'
import { FaChevronDown, FaUsersCog, FaUsers, FaEdit, FaTrash, FaRegCalendarAlt, FaCogs, FaCommentDots } from 'react-icons/fa'
import {FiUpload} from 'react-icons/fi'
//import {BsChat} from 'react-icons/bs'
import schoolLogo from '../../assets/virtuous-sprouts.png'


const ViewResult = () => {
    const history = useHistory()

    const {state, fetchAllMembers, fetchStudentResult, resultCommentView,
        recoverUser, handleResultUploadData, resetSomeStates,
        deleteResult, pageTitle, deleteConfirmation} = useContext(StateManager)

    const [resultInput, setResultInput] = useState({studentClass: "", studentName: "", session: "", term: ""})

    useEffect(()=>{
        
        document.title = "Result Fetching"
        pageTitle("Result View")
       
        return () => {
            resetSomeStates();
          };
    }, [])


    // useEffect(()=>{
    //     const callback = function(entries){
    //         entries.forEach(entry =>{
    //             if(entry.isIntersecting){
    //                 document.querySelector(".bottom-nav-container").classList.add("change-style")
    //                 //document.querySelector(".profile-main-container").classList.add("profile-main-container_print")
    //             }
    //             else{
    //                 document.querySelector(".bottom-nav-container").classList.remove("change-style")
    //                 //document.querySelector(".profile-main-container").classList.remove("profile-main-container_print")
    //             }
    //         })
    //     }

    //     let observer = new IntersectionObserver(callback)
    //     const target = document.querySelectorAll(".result-comment")
    //     console.log(target)
    //     target.forEach(target=>{
    //         observer.observe(target)
    //     })

    //     return () => {
    //         observer = null;
    //       };
    // })

    function handleResultField(e){
        setResultInput({...resultInput, [e.target.name]: e.target.value})
        if(e.target.value && e.target.name === "studentClass"){
            fetchAllMembers(e.target.value)
        }
    }

    function handleResultFetch() {
        if(state.user.memberType === "Student"){
            resultInput.studentName = state.user.username
            resultInput.studentClass = state.user.memberClass
        }
        localStorage.setItem("resultFetchPayload", JSON.stringify(resultInput))
        fetchStudentResult(resultInput)
    }

   async function handleRoute(route) {
        if(route === "edit"){

            handleResultUploadData({
                ...state.editResultData, 
                session: resultInput.session, term: resultInput.term, resultId: state.resultID,
                studentName: resultInput.studentName, studentClass: resultInput.studentClass
            })
            console.log({resultId: state.resultID})
            history.push("/admin/result-update")
        }
        else if(route === "delete"){
            await localStorage.setItem("deleteParams", JSON.stringify(resultInput))
            deleteConfirmation(true, "result")
            //deleteResult(resultInput)
        }
    }

    let options;
    if(state.allMembers){
        options = state.allMembers.map(user => {
            if(user.memberType != "Admin" && user.memberType != "Teacher"){
                return(
                    <option value={user.username} key={user._id}>{`${user.firstName} ${user.surname}`}</option>
                )
            }
        })
    }

    let academicSessions = helpers.academicSessions().map(session => {
        return(
            <option value={session} key={session}>{session}</option>
        )
    })

    let result;
    if(state.resultData != null){
        let count = 0
        result = state.resultData.map(data => {
           
            count++
            return(
                <div className="info-container" key={count}>
                    <p className="result-sn">{count}</p>
                    <p className="result-subjects">{data.subject}</p>
                    <p className="result-test-score">{data.testScore}</p>
                    <p className="result-exam-score">{data.examScore}</p>
                    <p className="result-total">{data.totalScore}</p>
                </div>
            )
        })
    }

    //let userData = JSON.parse(localStorage.getItem("userData"))

    return (
        <div className="profile-main-container" >
            <div className="custom-input-container">
                <img src={schoolLogo} className="result-school-logo" />
                <p className="result-schoolName">Virtuous Sprouts Academy</p>
            {state.user.memberType != "Student" ? <div className="input-container resized-input select-input">
                    <FaUsersCog  className="user-icon"/>
                    <input disabled type="text" value={resultInput.studentClass} className="user-input resized-text" placeholder="Select member class"/>
                    <select name="studentClass" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select member class</option>
                        <option value="Creche">Creche</option>
                        <option value="Toddler 1">Toddler 1</option>
                        <option value="Toddler 2">Toddler 2</option>
                        <option value="Nursery 1">Nursery 1</option>
                        <option value="Nursery 2">Nursery 2</option>
                        <option value="Primary 1">Primary 1</option>
                        <option value="Primary 2">Primary 2</option>
                        <option value="Primary 3">Primary 3</option>
                        <option value="Primary 4">Primary 4</option>
                        <option value="Primary 5">Primary 5</option>
                        <option value="JSS 1">JSS 1</option>
                        <option value="JSS 2">JSS 2</option>
                        <option value="JSS 3">JSS 3</option>
                        <option value="SSS 1">SSS 1</option>
                        <option value="SSS 2">SSS 2</option>
                        <option value="SSS 3">SSS 3</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div> : null}
               {state.user.memberType != "Student" ? resultInput.studentClass ?<div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.studentName} className="user-input resized-text" placeholder="Select student"/>
                    <select name="studentName" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select student</option>
                        {options}
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div> : null : null}

                {state.user.memberType != "Student" ? resultInput.studentName ? <div className="input-container resized-input select-input">
                    <FaRegCalendarAlt  className="user-icon"/>
                    <input disabled type="text" value={resultInput.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        {academicSessions}
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>: null : <div className="input-container resized-input select-input">
                    <FaRegCalendarAlt  className="user-icon"/>
                    <input disabled type="text" value={resultInput.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        {academicSessions}
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>}

                {state.user.memberType != "Student" ? resultInput.session ? <div className="input-container resized-input select-input">
                    <FaCogs  className="user-icon"/>
                    <input disabled type="text" value={resultInput.term} className="user-input resized-text" placeholder="Select term"/>
                    <select name="term" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Term</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>: null: <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.term} className="user-input resized-text" placeholder="Select term"/>
                    <select name="term" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Term</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>}

                <a className="view-result-btn get-result-btn" onClick={handleResultFetch}>Get Result</a>
            </div>

            {state.resultData != null ? <div style={{width: "100%", overflow: "auto"}}>
                <div className="header-text header-text-large">
                    <p className="info-title-text">Result Data</p>
                    {state.user.memberType === "Admin" ? 
                    <FaCommentDots className="header-text-icon-3" onClick={()=>resultCommentView(true)} />: null}
                    {state.user.memberType === "Admin" ? 
                    <FaEdit className="header-text-icon-1" onClick={()=>handleRoute("edit")} />: null}
                    {state.user.memberType === "Admin" ? 
                    <FaTrash className="header-text-icon-2" onClick={()=>handleRoute("delete")} />: null}
                </div>

                <div className="result-container">
                    <div className="info-container result-label">
                        <p className="result-sn">SN</p>
                        <p className="result-subjects">Subject</p>
                        <p className="result-test-score">Test Score</p>
                        <p className="result-exam-score">Exam Score</p>
                        <p className="result-total">Total Score</p>
                    </div>
                    {result}
                </div>

                <div className="comment-container">
                    <p className="result-comment">Teacher's Comment: <span className="comment-text">{state.resultComment.teacherComment}</span></p>
                    <p className="result-comment">Principal's Comment: <span className="comment-text">{state.resultComment.adminComment}</span></p>
                </div>
            </div> : null}

            {state.user.memberType === "Teacher" ? <div className="result-upload-btn">
                <FiUpload className="result-upload-icon" onClick={()=> history.push("/teacher/result-upload")} />
            </div> : null}
        </div>
    )
}

export default ViewResult