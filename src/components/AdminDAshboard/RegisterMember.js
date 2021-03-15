import React, {useContext, useState} from 'react'
import StateManager from '../../stateManager/manager'
import {FaUserPlus, FaUser, FaAt, FaPhoneAlt, FaLocationArrow, 
    FaChevronDown, FaUsersCog, FaUsers, FaGlobe} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

const RegisterMember = () => {
    const {state, signUp} = useContext(StateManager)
    const [memberDetails, setMemberDetails] = useState({
        firstName: "", surname: "", email: "", phoneNumber: "", 
        address: "", gender: "", memberType: "", memberClass: ""
    })

    function handleSelectField(e){
        setMemberDetails({...memberDetails, [e.target.name]: e.target.value})
    }
    async function handleMemberCreation(){
        await signUp(memberDetails);
    }

    return(
        <div className="registration-container">
            {state.process ? <div className="request-shade">
                <Loader 
                    type="Puff"
                    color="#6d9c7d"
                    height={100}
                    width={100}
                />
            </div> : null}
            <div className="form-container">
                <div className="page-title-container">
                    <FaUserPlus className="page-title-icon"/>
                    <p className="page-title-text">New Member</p>
                </div>

                <div className="input-container resized-input">
                    <FaUser  className="user-icon"/>
                    <input type="text" name="firstName" className="user-input resized-text" placeholder="First name" onChange={handleSelectField}/>
                </div>
                <div className="input-container resized-input">
                    <FaUser  className="user-icon"/>
                    <input type="text" name="surname" className="user-input resized-text" placeholder="Last name" onChange={handleSelectField}/>
                </div>
                <div className="input-container resized-input">
                    <FaAt  className="user-icon"/>
                    <input type="email" name="email" className="user-input resized-text" placeholder="Email" onChange={handleSelectField}/>
                </div>
                <div className="input-container resized-input">
                    <FaPhoneAlt  className="user-icon"/>
                    <input type="tel" name="phoneNumber" className="user-input resized-text" placeholder="Phone number" onChange={handleSelectField}/>
                </div>
                <div className="input-container resized-input">
                    <FaLocationArrow  className="user-icon"/>
                    <input type="text" name="address" className="user-input resized-text" placeholder="Address" onChange={handleSelectField}/>
                </div>
                <div className="input-container resized-input select-input">
                    <FaUsersCog  className="user-icon"/>
                    <input disabled type="text" value={memberDetails.gender} className="user-input resized-text" placeholder="Select gender"/>
                    <select name="gender" className="user-input resized-text select-field" onChange={handleSelectField}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>

                <div className="input-container resized-input select-input">
                    <FaUsers  className="user-icon"/>
                    <input disabled type="text" value={memberDetails.memberType} className="user-input resized-text" placeholder="Select member type"/>
                    <select name="memberType" className="user-input resized-text select-field" onChange={handleSelectField}>
                        <option value="">Select member type</option>
                        <option value="Admin">Admin</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                    <FaChevronDown  className="select-field-icon"/>
                </div>

                <div className="input-container resized-input select-input">
                    <FaGlobe  className="user-icon"/>
                    <input disabled type="text" value={memberDetails.memberClass} className="user-input resized-text" placeholder="Select class"/>
                    <select name="memberClass" className="user-input resized-text select-field" onChange={handleSelectField}>
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

                <a className="login-btn create-member" onClick={handleMemberCreation}>Create member</a>
            </div>
            
        </div>
    )
}

export default RegisterMember