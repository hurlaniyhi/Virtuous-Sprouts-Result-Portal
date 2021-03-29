import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import { FaChevronDown, FaUsersCog, FaUsers, FaEdit, FaTrash, FaUpload } from 'react-icons/fa'
import {FiUpload} from 'react-icons/fi'


const ViewResult = () => {
    const history = useHistory()

    const {state, fetchAllMembers, fetchStudentResult, 
        recoverUser, handleResultUploadData, resetSomeStates,
        deleteResult, pageTitle, deleteConfirmation} = useContext(StateManager)

    const [resultInput, setResultInput] = useState({studentClass: "", studentName: "", session: "", term: ""})

    useEffect(()=>{
        //userRecovery()

        document.title = "Result Fetching"
        pageTitle("Result View")
        return () => {
            resetSomeStates();
          };
    }, [])

    async function userRecovery(){
        recoverUser()
    }

    function handleResultField(e){
        setResultInput({...resultInput, [e.target.name]: e.target.value})
        if(e.target.value && e.target.name === "studentClass"){
            fetchAllMembers(e.target.value)
        }
    }

    function handleResultFetch() {
        if(state.user.memberType === "Student"){
            resultInput.studentName = `${state.user.firstName} ${state.user.surname}`
            resultInput.studentClass = state.user.memberClass
        }
        fetchStudentResult(resultInput)
    }

   async function handleRoute(route) {
        if(route === "edit"){

            handleResultUploadData({...state.editResultData, 
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
                    <option value={`${user.firstName} ${user.surname}`} key={user._id}>{`${user.firstName} ${user.surname}`}</option>
                )
            }
        })
    }

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
        <div className="profile-main-container">
            <div className="custom-input-container">
            {state.user.memberType != "Student" ? <div className="input-container resized-input select-input">
                    <FaUsersCog  className="user-icon"/>
                    <input disabled type="text" value={resultInput.studentClass} className="user-input resized-text" placeholder="Select member class"/>
                    <select name="studentClass" className="user-input resized-text select-field" onChange={handleResultField}>
                    <option value="">Select member class</option>
                        <option value="Nursery 1">Nursery 1</option>
                        <option value="Nursery 2">Nursery 2</option>
                        <option value="Primary 1">Primary 1</option>
                        <option value="Primary 2">Primary 2</option>
                        <option value="Primary 3">Primary 3</option>
                        <option value="Primary 4">Primary 4</option>
                        <option value="Primary 5">Primary 5</option>
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
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        <option value="2019/2020">2019/2020</option>
                        <option value="2020/2021">2020/2021</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>: null : <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        <option value="2019/2020">2019/2020</option>
                        <option value="2020/2021">2020/2021</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>}

                {state.user.memberType != "Student" ? resultInput.session ? <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
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

            {state.resultData != null ? <div style={{width: "100%"}}>
                <div className="header-text header-text-large">
                    <p className="info-title-text">Result Data</p>
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
            </div> : null}

            {state.user.memberType === "Teacher" ? <div className="result-upload-btn">
                <FiUpload className="result-upload-icon" onClick={()=> history.push("/teacher/result-upload")} />
            </div> : null}
        </div>
    )
}

export default ViewResult