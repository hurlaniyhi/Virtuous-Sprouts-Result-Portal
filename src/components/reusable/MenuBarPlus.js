import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import logo from '../../assets/logo2.jpg'


const MenuBarPlus = ({homeRoute, profileRoute}) => {
    const history = useHistory()
    const {signOut} = useContext(StateManager)

    function handleNavigation(route){
        history.push(route)
        document.querySelector(".navigation__checkbox").checked = false
    }

    function handleLogOut() {
        signOut(history)
    }

    return(
        <div class="navigation">
            <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
            <label for="navi-toggle" class="navigation__button">
                <span class="navigation__icon">&nbsp;</span>
            </label>

            <div class="navigation__background">
                <img src={logo}  className="nav-logo-plus" />
                <p style={{textAlign: "center"}} className="nav-title-plus">Virtuous Sprout Academy</p>
                <div className="option-list">
                    <p className="option-list-items" onClick={()=>handleNavigation(homeRoute)}>Home</p>
                    <p className="option-list-items" onClick={()=>handleNavigation(profileRoute)}>Student Profile</p>
                    <p className="option-list-items" onClick={handleLogOut}>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default MenuBarPlus