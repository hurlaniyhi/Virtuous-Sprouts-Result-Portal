import React, {useContext} from 'react'
import { useHistory } from "react-router-dom"
import StateManager from '../../stateManager/manager'
import { FaKey } from 'react-icons/fa'

const Home = ({navRoute, containerClass, greeting, notification, buttonText, buttonClass, introContainer}) => {
    const history = useHistory()
    const {state, changePasswordView} = useContext(StateManager)
    
    function handleNavigation(){
        history.push(navRoute)
    }
    return(
        <div className={containerClass}>
            <div className={introContainer}>
                <p className="home-intro">{greeting}</p>
                <p className="home-intro">{notification}</p>
            </div>
            <a className={buttonClass} onClick={handleNavigation}>{buttonText}</a>
            <div className="bubble1"></div>
            <div className="bubble2"></div>
            <div className="bubble3"></div>

            {state.user.memberType === "Admin" ? <div className="change-pass-icon">
                <FaKey className="result-upload-icon" style={{fontSize: "2rem"}} onClick={()=> changePasswordView(true)} />
            </div> : null}
        </div>
    )
}
export default Home