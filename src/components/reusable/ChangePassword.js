import React from 'react'

const ChangePassword = (props) => {

    return(
        <div style={{width: "100%"}}>
            {props.display ? <div className="feedback-container">
                <div className="alert-block">
                    <p className="alert-title" style={{fontSize: "1.7rem", paddingBottom: "2rem"}}>Change Password</p>
                    {props.children}
                </div>
            </div> : null}
        </div>
    )
}

export default ChangePassword