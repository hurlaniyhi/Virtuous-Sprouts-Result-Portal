import React, {useContext, useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import {helpers} from '../../helpers/helpers'
import { FaChevronDown, FaUsers, FaRegCalendarAlt, FaCogs, FaVenusDouble, FaMarker } from 'react-icons/fa'
import {FiTrash2, FiGlobe} from 'react-icons/fi'


const ResultUpload = () => {

    const history = useHistory()
    
    const {state, handleResultUploadData, 
        infoNotifier, fetchAllMembers, resetSomeStates2,
        uploadResult, recoverUser, updateResult, pageTitle} = useContext(StateManager)

    const [resultInput, setResultInput] = useState({subject: "", score: ""})

    useEffect(()=>{
        fetchStudents()

        if(state.user.memberType === "Admin"){
            document.title = "Result Editing"
            pageTitle("Result Alteration")
        }
        else{
            document.title = "Result Upload"
            pageTitle("Result Upload")
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
                    <FaRegCalendarAlt  className="user-icon"/>
                    <input disabled type="text" value={state.editResultData.session} className="user-input resized-text" placeholder="Select session"/>
                    <select name="session" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select Session</option>
                        {academicSessions}
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
                    <FaVenusDouble  className="user-icon"/>
                    <input disabled type="text" value={state.editResultData.resultType} className="user-input resized-text" placeholder="Select result type"/>
                    <select name="resultType" className="user-input resized-text select-field" onChange={handleResultField}>
                        <option value="">Select result type</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>

                {state.user.memberType != "Admin" ?<div className="input-container resized-input">
                    <FaMarker  className="user-icon"/>
                    <input type="text" name="teacherComment" value={state.editResultData.teacherComment} className="user-input resized-text" placeholder="Teacher's Comment" onChange={handleResultField}/>
                </div>: null}

            </div>

            <div className="each-subject-result-container">
                <div className="reduced-width-select">
                    <input disabled type="text" value={resultInput.subject} className="upload-select-input resized-text" placeholder="Select subject"/>
                    <select name="subject" className="each-upload-select-field" onChange={handleSubjectAndScore}>
                        <option value="">Select Subject</option>
                        <option value="Tahfeedhul Qur'an">Tahfeedhul Qur'an</option>
                        <option value="Prevocational Studies">Prevocational Studies</option>
                        <option value="Basic Science">Basic Science</option>
                        <option value="Islamic Studies">Islamic Studies</option>
                        <option value="National Value">National Value</option>
                        <option value="Quantitative Reasoning">Quantitative Reasoning</option>
                        <option value="Al-Arabiyyah">Al-Arabiyyah</option>
                        <option value="Verbal Reasoning">Verbal Reasoning</option>
                        <option value="Al-Qiraahah Wal-Kitaabah">Al-Qiraahah Wal-Kitaabah</option>
                        <option value="Mathematics/Numeracy">Mathematics/Numeracy</option>
                        <option value="English/Literacy">English/Literacy</option>
                        <option value="Creative Arts/Drawing">Creative Arts/Drawings</option>
                        <option value="Handwriting">Handwriting</option>
                        <option value="At-Taoheed">At-Taoheed</option>
                        <option value="Al-Hadith">Al-Hadith</option>
                        <option value="Rhymes">Rhymes</option>
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