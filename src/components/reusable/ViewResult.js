import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import { FaChevronDown, FaUsersCog, FaUsers, FaEdit, FaTrash } from 'react-icons/fa'


const ViewResult = () => {
    const history = useHistory()
    const {state, fetchAllMembers, fetchStudentResult} = useContext(StateManager)
    const [resultInput, setResultInput] = useState({studentClass: "", studentName: "", session: "", term: ""})

    function handleResultField(e){
        setResultInput({...resultInput, [e.target.name]: e.target.value})
        if(e.target.value && e.target.name === "studentClass"){
            fetchAllMembers(e.target.value)
        }
    }

    function handleResultFetch() {
        fetchStudentResult(resultInput)
    }

    let options;
    if(state.allMembers){
        options = state.allMembers.map(user => {
            
            return(
                <option value={`${user.firstName} ${user.surname}`} key={user._id}>{`${user.firstName} ${user.surname}`}</option>
            )
        })
    }

    let result;

    if(state.resultData.length > 0){
        let count = 0
        result = state.resultData.map(data => {
           
            count++
            return(
                <div className="info-container">
                    <p className="result-sn">{count}</p>
                    <p className="result-subjects">{data.subject}</p>
                    <p className="result-test-score">{data.testScore}</p>
                    <p className="result-exam-score">{data.examScore}</p>
                    <p className="result-total">{data.totalScore}</p>
                </div>
            )
        })
    }

    let userType = localStorage.getItem('memberType')

    return (
        <div className="profile-main-container">
            <div className="custom-input-container">
                <div className="input-container resized-input select-input">
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
                </div>
                <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.studentName} className="user-input resized-text" placeholder="Select student"/>
                    <select name="studentName" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select student</option>
                        {options}
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>
                <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        <option value="2019/2020">2019/2020</option>
                        <option value="2020/2021">2020/2021</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>
                <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={resultInput.term} className="user-input resized-text" placeholder="Select term"/>
                    <select name="term" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Term</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>
            </div>

            <a className="view-result-btn upload-btn" onClick={handleResultFetch}>getResult</a>

            <div style={{width: "100%"}}>
                <div className="header-text header-text-large">
                    <p className="info-title-text">Result Data</p>
                    {userType === "Admin" ? 
                    <FaEdit className="header-text-icon-1" />: null}
                    {userType === "Admin" ? 
                    <FaTrash className="header-text-icon-2" />: null}
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

                <a className="view-result-btn upload-btn">New upload</a>
            </div>
        </div>
    )
}

export default ViewResult