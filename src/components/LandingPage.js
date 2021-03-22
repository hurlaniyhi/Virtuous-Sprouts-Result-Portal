import React from 'react'
import myLogo from '../assets/logo2.jpg'
import graduation from '../assets/graduation.svg'
import {useHistory} from 'react-router-dom'
import "../styles/style.css"


const LandingPage = () => {
    const history = useHistory()

    const loginPage = () => {
        history.push("/login")
    }
    return(
        <div className="lpContainer">
            <div className="subLpContainer">
                <div className="design1"></div>
                <div className="design2"></div>
                <div className="design3"></div>
                <img src={graduation} className="student-cartoon" />
                <img src={myLogo} className="school-logo"/>
                {/* <p className="schoolName school-name-arabic">أكادمية النبت الطيب</p> */}
                <p className="schoolName">Virtuous Sprout Academy</p>
                <p className="aboutSchool">An haven where you can get your child a solid/sound western and islamic education.</p>
                <p className="aboutSchool">We offer western education, Tahfeedhul Qur'an, Virtue and Etiquettes,</p>
                <p className="aboutSchool">Extra-Curriculum activities, I.T and computer training.</p>
                <p className="appTitle">Result Portal</p>
            </div>
            <a className="getStarted" onClick={loginPage}>Get Started</a>
        </div>
    )
}

export default LandingPage