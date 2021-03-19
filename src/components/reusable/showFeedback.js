import React from 'react'
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'

const ShowFeedback = (props) => {

    return(
        <div style={{width: "100%"}}>
            {props.display ? <div className="feedback-container">
                <div className="feedback-block">
                    <div className="top-container" style={{backgroundColor: props.color}}>
                        {props.color != "red" ?<FaCheckCircle className="feedback-icon"/> : 
                        <FaTimesCircle className="feedback-icon" />}
                    </div>

                    <p className="feedback-title" style={{color: props.color}}>{props.title}</p>
                    <p className="feedback-text">{props.text}</p>

                    {props.children}
                </div>
            </div> : null}
        </div>
    )
}

export default ShowFeedback