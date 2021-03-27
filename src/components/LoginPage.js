import React, {useState, useContext} from 'react'
import loginLogo from '../assets/virtuous-sprouts.png'
import {FaHome, FaLock, FaEyeSlash, FaEye, FaUser} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'
import StateManager from '../stateManager/manager'
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

    let auth = localStorage.getItem("token")
   
    return(
        <div style={{height: "100%", width: "100%", overflow: "hidden"}}>
            {!auth ? <div className="login-container">
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
            </div> : history.push("/admin")}
        </div>
    )
}

export default Login