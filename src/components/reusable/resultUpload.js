import React, {useContext, useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import {helpers} from '../../helpers/helpers'
import { FaChevronDown, FaUsersCog, FaUsers, FaEdit, FaGlobe, FaCogs, FaHighlighter } from 'react-icons/fa'
import {FiTrash2, FiGlobe} from 'react-icons/fi'


const ResultUpload = () => {

    const history = useHistory()
    
    const {state, handleResultUploadData, 
        infoNotifier, fetchAllMembers, resetSomeStates2,
        uploadResult, recoverUser, updateResult} = useContext(StateManager)

    const [resultInput, setResultInput] = useState({subject: "", score: ""})

    useEffect(()=>{
        fetchStudents()

        if(state.user.memberType === "Admin"){
            document.title = "Result Editing"
        }
        else{
            document.title = "Result Upload"
        }
        return () => {
            resetSomeStates2();
          };
    }, [])

    async function fetchStudents(){
        let userData = await JSON.parse(localStorage.getItem("userData"))
        fetchAllMembers(userData.memberClass)
        recoverUser()
    }
    function handleResultField(e){
        handleResultUploadData({...state.editResultData, [e.target.name]: e.target.value})
    }

    function handleResultToUpload(){
        if(state.editResultData.result ===  null){
            let resultInputs = {...resultInput, sn: 1}
            handleResultUploadData({...state.editResultData, result: [resultInputs]})
        }
        else{
            let exist = false

            for(let check of state.editResultData.result){
                if(check.subject === resultInput.subject){
                    exist = true
                }
            }

            if(exist){
                infoNotifier(helpers.alertInfo("Subject is already picked"))
            }
            else{
                let resultInputs = {...resultInput, sn: (state.editResultData.result.length + 1)}
                let updatedResult = [...state.editResultData.result, resultInputs]
                handleResultUploadData({...state.editResultData, result: updatedResult})
            }
        }
    }

    function handleSubjectAndScore(e){
        setResultInput({...resultInput, [e.target.name]: e.target.value})
    }

    function handleDataDelete(id) {
        let sievedResult = []
        let SN = 1
        for(let check of state.editResultData.result){
            if(check.sn != id){
                check.sn = SN
                sievedResult.push(check)
                SN++
            }
        }
        handleResultUploadData({...state.editResultData, result: sievedResult})
    }

    function handleUploadResult(){
        uploadResult(state.editResultData)
    }

    function handleUpdateResult(){
        updateResult(history)
    }



    let resultToUpload;
    if(state.editResultData.result != null){
        console.log(state.editResultData.result)
        resultToUpload = state.editResultData.result.map(data => {
            return(
                <div className="info-container" key={data.sn}>
                    <p className="upload-sn">{data.sn}</p>
                    <p className="upload-subjects">{data.subject}</p>
                    <p className="upload-type">{data.score}</p>
                    <p className="upload-result-delete" onClick={()=>handleDataDelete(data.sn)}><FiTrash2 className="upload-delete-icon" /></p>
                </div>
            )
        })
    }

    let options;
    if(state.allMembers){
        options = state.allMembers.map(user => {
            
            return(
                <option value={`${user.firstName} ${user.surname}`} key={user._id}>{`${user.firstName} ${user.surname}`}</option>
            )
        })
    }


    if(!state.editResultData.session && state.user.memberType === "Admin"){
        history.push("/admin")
    }

    return(
        <div className="profile-main-container">
            <div className="custom-input-container">
              {state.user.memberType != "Admin" ? <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={state.editResultData.studentName} className="user-input resized-text" placeholder="Select student"/>
                    <select name="studentName" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select student</option>
                        {options}
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>: null}

                <div className="input-container resized-input select-input">
                    <FaGlobe  className="user-icon"/>
                    <input disabled type="text" value={state.editResultData.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        <option value="2019/2020">2019/2020</option>
                        <option value="2020/2021">2020/2021</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>

                <div className="input-container resized-input select-input">
                    <FaCogs  className="user-icon"/>
                    <input disabled type="text" value={state.editResultData.term} className="user-input resized-text" placeholder="Select term"/>
                    <select name="term" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Term</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>

                <div className="input-container resized-input select-input">
                    <FaHighlighter  className="user-icon"/>
                    <input disabled type="text" value={state.editResultData.resultType} className="user-input resized-text" placeholder="Select result type"/>
                    <select name="resultType" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select result type</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>

            </div>

            <div className="each-subject-result-container">
                <div className="reduced-width-select">
                    <input disabled type="text" value={resultInput.subject} className="upload-select-input resized-text" placeholder="Select subject"/>
                    <select name="subject" className="each-upload-select-field" onChange={handleSubjectAndScore}>
                        <option value="">Select Subject</option>
                        <option value="Biology">Biology</option>
                        <option value="Basic Science">Basic Science</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="English">English</option>
                        <option value="History">History</option>
                        <option value="Account">Account</option>
                    </select>
                    <FaChevronDown  className="each-upload-select-field-icon"/>
                </div>
                <input type="number" name="score" className="score-input" placeholder="Enter score" onChange={handleSubjectAndScore}/>
                <a className="add-result-btn" onClick={handleResultToUpload}>Add Result</a>
            </div>
            


            {state.editResultData.result != null ? <div style={{width: "100%"}}>
                <div className="header-text header-text-large">
                    <p className="info-title-text">Result to upload</p>
                </div>

                <div className="upload-result-container">
                    <div className="info-container result-label">
                        <p className="upload-sn">SN</p>
                        <p className="upload-subjects">Subject</p>
                        <p className="upload-type">{state.editResultData.resultType} Score</p>
                        <p className="upload-result-delete"></p>
                    </div>
                    {resultToUpload}
                </div>

                {state.user.memberType != "Admin" ? <a className="view-result-btn get-result-btn" onClick={handleUploadResult}>Upload Result</a>:
                <a className="view-result-btn get-result-btn" onClick={handleUpdateResult}>Update Result</a>
                }
            </div> : null}

        </div>
    )
}

export default ResultUpload