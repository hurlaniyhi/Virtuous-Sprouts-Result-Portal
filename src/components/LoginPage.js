import React, {useState, useContext} from 'react'
import loginLogo from '../assets/logo2.jpg'
import {FaHome, FaLock, FaEyeSlash, FaEye, FaUser} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'
import StateManager from '../stateManager/manager'
import Loader from 'react-loader-spinner'
import "../styles/style.css"



const Login = () => {
    const history = useHistory()
    const {state, signIn} = useContext(StateManager)
    const [passwordType, setPasswordType] = useState("password")
    const [userInput, setUserInput] = useState({username: "", password: "", requestor: false})


    function handleInput(e){
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    const handleLogin = async() => {
       await signIn(history, userInput.username, userInput.password) 
    }

    function handlePasswordType(type){
        type === "password" ? setPasswordType("password") : setPasswordType("text")
    }
   
    return(
        <div className="login-container">
            {state.process ? <div className="request-shade">
                <Loader 
                    type="Puff"
                    color="#6d9c7d"
                    height={100}
                    width={100}
                />
            </div> : null}
            <img src={loginLogo} className="login-logo" />
            <p className="login-greeting">Welcome Back, Kindly Login here</p>
            
            <div className="input-container">
                <FaUser  className="user-icon"/>
                <input type="text" name="username" className="user-input" placeholder="Username" onChange={handleInput}/>
            </div>
            <div className="input-container">
                <FaLock  className="user-icon"/>
                <input type={passwordType} name="password" className="password-input" placeholder="Password" onChange={handleInput}/>
                {passwordType != "password" ? 
                <FaEye className="show-password-icon1" onClick={()=>handlePasswordType("password")}/> : 
                <FaEyeSlash className="show-password-icon2" onClick={()=>handlePasswordType("text")}/>}
            </div>
            
            <a className="login-btn" onClick={handleLogin}>Login</a>
            
            <div className="keep-loggedIn">
                <div className="slider-container">
                    <input type="checkbox" className="checkbox"/>
                    <div className="slider-shadow"></div>
                    <div className="slider"></div>
                </div>
                <p className="slider-text">Keep Logged In</p>
            </div>
            {/* <a className="forget-password">Forget Password?</a> */}
        </div>
    )
}

export default Login