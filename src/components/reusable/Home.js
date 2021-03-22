import React from 'react'
import { useHistory } from "react-router-dom"

const Home = ({navRoute, containerClass, greeting, notification, buttonText, buttonClass, introContainer}) => {
    const history = useHistory()
    
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
        </div>
    )
}
export default Home