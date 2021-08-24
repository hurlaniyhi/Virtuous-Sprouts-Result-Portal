import React from 'react'

const ShowAlert = (props) => {

    return(
        <div style={{width: "100%"}}>
            {props.display ? <div className="feedback-container notifier-container">
                <div className="alert-block">
                    <p className="alert-title">{props.title}</p>
                    <p className="alert-text">{props.text}</p>
                    {props.children}
                </div>
            </div> : null}
        </div>
    )
}

export default ShowAlert