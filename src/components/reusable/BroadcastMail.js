import React from 'react'

const BroadcastMail = (props) => {

    return(
        <div style={{width: "100%"}}>
            {props.display ? <div className="feedback-container">
                <div className="broadcast-mail-block">
                    <p className="alert-title" style={{fontSize: "1.7rem", paddingBottom: "2rem"}}>{props.title}</p>
                    {props.children}
                </div>
            </div> : null}
        </div>
    )
}

export default BroadcastMail