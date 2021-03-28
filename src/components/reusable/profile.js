import React, {useState, useContext, useEffect} from 'react'
import StateManager from '../../stateManager/manager'
import {useHistory} from 'react-router-dom'
import { FaChevronDown, FaUsersCog, FaUsers, FaEdit, FaTrash } from 'react-icons/fa'

    
const Profile = ({route, resultRoute}) => {

    const history = useHistory()
    const {state, fetchAllMembers, getMemberProfile, setProfileUpdate, memberDelete, 
        recoverUser, resetSomeStates} = useContext(StateManager)
    const [userInput, setUserInput] = useState({memberClass: "", studentName: ""})

    useEffect(()=>{
        //handleUserRecovery()
        document.title = "Member Profile"
    }, [])

    async function handleUserRecovery(){
       await recoverUser()
    }


    function handleClassField(e){
        setUserInput({...userInput, memberClass: e.target.value})
        if(e.target.value){
            fetchAllMembers(e.target.value)
        }
    }
    function handleUserDetails(e){
        let userProfile = JSON.parse(e.target.value)
        let name = `${userProfile.firstName} ${userProfile.surname}`
        setUserInput({...userInput, studentName: name})
        getMemberProfile(userProfile)
    }

    function handleProfileUpdate(){
        console.log({route})
        setProfileUpdate(route, history)
    }

    async function handleMemberDelete(){
       await memberDelete()
       setUserInput({...userInput, studentName: ""})
    }

    // function handleNavigation(){
    //     history.push(resultRoute)
    // }


    let options;
    if(state.allMembers){
        options = state.allMembers.map(user => {
            
            return(
                <option value={JSON.stringify(user)} key={user._id}>{`${user.firstName} ${user.surname}`}</option>
            )
        })
    }

   // let userType = localStorage.getItem('memberType')

    return(
        <div className="profile-main-container">
            <div className="custom-input-container">
                {state.user.memberType != "Student" ? <div className="input-container resized-input select-input">
                    <FaUsersCog  className="user-icon"/>
                    <input disabled type="text" value={userInput.memberClass} className="user-input resized-text" placeholder="Select member class"/>
                    <select name="memberClass" className="user-input resized-text select-field" onChange={handleClassField}>
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
                {state.allMembers ? <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={userInput.studentName} className="user-input resized-text" placeholder="Select student"/>
                    <select name="studentName" className="user-input resized-text select-field" onChange={handleUserDetails}>
                        <option value="">Select student</option>
                        {options}
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div> : null}
            </div>

            {state.memberProfile ? <div style={{width: "100%"}}>
                <div className="header-text">
                    <p className="info-title-text">User Details</p>
                    {state.user.memberType === "Admin" ? 
                    <FaEdit className="header-text-icon-1" onClick={handleProfileUpdate} />: null}
                    {state.user.memberType === "Admin" ? 
                    <FaTrash className="header-text-icon-2" onClick={handleMemberDelete} />: null}
                </div>

                <div className="profile-sub-container">
                    <div className="info-container">
                        <p className="info-label">First name</p>
                        <p className="user-info">{state.memberProfile.firstName}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Surname</p>
                        <p className="user-info">{state.memberProfile.surname}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Username</p>
                        <p className="user-info">{state.memberProfile.username}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Email</p>
                        <p className="user-info">{state.memberProfile.email}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Phone number</p>
                        <p className="user-info">{state.memberProfile.phoneNumber}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Address</p>
                        <p className="user-info">{state.memberProfile.address}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Gender</p>
                        <p className="user-info">{state.memberProfile.gender}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">User type</p>
                        <p className="user-info">{state.memberProfile.memberType}</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Class</p>
                        <p className="user-info">{state.memberProfile.memberClass}</p>
                    </div>
                    {state.user === "Admin" ? <div className="info-container">
                        <p className="info-label">Password</p>
                        <p className="user-info">{state.memberProfile.passRecovery}</p>
                    </div>: null}
                </div>

                {/* <a className="view-result-btn" onClick={handleNavigation}>View Result</a> */}
            </div> : null}
        </div>
    )
}

export default Profile