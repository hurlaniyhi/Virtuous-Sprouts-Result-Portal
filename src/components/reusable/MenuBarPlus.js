import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import logo from '../../assets/virtuous-sprouts.png'


const MenuBarPlus = ({homeRoute, profileRoute, resultRoute}) => {
    const history = useHistory()
    const {state, logoutConfirmation, changePasswordView} = useContext(StateManager)

    function handleNavigation(route){

        if(route === "password"){
            changePasswordView(true)
        }
        else if(route === "logout"){
            handleLogOut()
        }
        else{
            history.push(route)
        }
        document.querySelector(".navigation__checkbox").checked = false
    }

    function handleLogOut() {
        logoutConfirmation(true, history)
    }

    let userData = JSON.parse(localStorage.getItem("userData"))

    return(
        <div class="navigation">
            <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
            <label for="navi-toggle" class="navigation__button">
                <span class="navigation__icon">&nbsp;</span>
            </label>

            <div class="navigation__background">
                <img src={logo}  className="nav-logo-plus" />
                <p style={{textAlign: "center"}} className="nav-title-plus">{state.pageTitle}</p>
                <div className="option-list">
                    <p className="option-list-items" onClick={()=>handleNavigation(homeRoute)}>Home</p>
                    <p className="option-list-items" onClick={()=>handleNavigation(profileRoute)}>Student Profile</p>
                    <p className="option-list-items" onClick={()=>handleNavigation(resultRoute)}>View Result</p>
                    {userData.memberType === "Teacher" ?
                        <p className="option-list-items" onClick={()=>handleNavigation("/teacher/result-upload")}>
                            Upload Result
                        </p>: null}
                    <p className="option-list-items" onClick={()=>handleNavigation("password")}>Change Password</p>
                    <p className="option-list-items" onClick={()=>handleNavigation("logout")}>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default MenuBarPlus