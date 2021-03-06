import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import StateManager from '../stateManager/manager'
import ShowFeedback from '../components/reusable/showFeedback'
import ShowAlert from '../components/reusable/showAlert'
import ChangePassword from '../components/reusable/ChangePassword'
import Loader from 'react-loader-spinner'
import LandingPage from '../components/LandingPage'
import Login from "../components/LoginPage"
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'
import AdminDashboard from './AdminDashboard'
import BroadcastMail from '../components/reusable/BroadcastMail'

function App() {
    const {state, presentFeedback, infoNotifier, logoutConfirmation, deleteConfirmation, memberDelete,
        signOut, passwordFieldChange, changePasswordView, toggleMailView, sendBroadcastMail,
        changePassword, deleteResult, resultCommentView, addResultComment} = useContext(StateManager)

        const [error, setError] = useState("")
        const [mailInfo, setMailInfo] = useState({mailSubject: "", mailContent: ""})
        const [resultComment, setResultComment] = useState({adminComment: "", commentType: ""})

    useEffect(()=>{

    }, [error])

    function handlePasswordField(e){
        passwordFieldChange({...state.passwordChangeFields, [e.target.name]: e.target.value})
    }

    async function handlePasswordChange() {
        if(state.passwordChangeFields.password){
            if(state.passwordChangeFields.password === state.passwordChangeFields.confirmPassword){
                changePassword()
                setError("")  // false
            }
            else{
                setError("Password did not match")  //true
            }
        }
        else{
            setError("Kindly enter new password and confirm")  //true
        }
    }

    function handlePasswordCancel() {
        changePasswordView(false)
        setError("")  //false
    }

    async function handleDelete(){
        await deleteConfirmation(false, state.deleteType)
        if(state.deleteType === "result"){
           const reqParam = await JSON.parse(localStorage.getItem("deleteParams"))
           console.log({deleteParam: reqParam})
           await deleteResult(reqParam)
        }
        else if(state.deleteType === "profile"){
           await memberDelete()
        }

        deleteConfirmation(false, "")
    }

    async function handleMailField(e){
        setMailInfo({...mailInfo, [e.target.name]: e.target.value})
    }

    async function handleEmailSending(){
        await sendBroadcastMail(mailInfo.mailSubject, mailInfo.mailContent)
        setMailInfo({mailSubject: "", mailContent: ""})
    }

    function handleCommentField(e){
        setResultComment({...resultComment, [e.target.name]: e.target.value})
    }

    async function handleAddComment(){
        await addResultComment(resultComment.adminComment, resultComment.commentType)

        if(resultComment.adminComment && resultComment.commentType){
            setResultComment({...resultComment, adminComment: "", commentType: ""})
        }
    }

  return (
    <Router>
        <ShowFeedback display={state.feedbackView} color={state.feedbackColor} text={state.feedbackText} 
                title={state.feedbackTitle}>
                <a className="feedback-btn" style={{backgroundColor: state.feedbackColor}} onClick={()=>
                    presentFeedback({view: false, color: "", title: "", text: ""})}>
                    Ok
                </a>
        </ShowFeedback>

        <ShowAlert display={state.alertView} title="Alert" text={state.alertText}>
            <a className="alert-btn" onClick={()=>
                infoNotifier({view: false, text: ""})}>
                Ok
            </a>
        </ShowAlert>

        <ShowAlert display={state.logoutView} title="Alert" text="Are you sure you want to logout?">
            <div className="logout-btn-container">
            <a className="logout-btns" onClick={()=> logoutConfirmation(false)}>
                    No
                </a>
                <a className="logout-btns" onClick={()=> signOut()}>
                    Yes
                </a>
            </div>
        </ShowAlert>

        <ShowAlert display={state.deleteView} title="Alert" text={`Are you sure you want to delete this ${state.deleteType}?`}>
            <div className="logout-btn-container">
            <a className="logout-btns" onClick={()=> deleteConfirmation(false, "")}>
                    No
                </a>
                <a className="logout-btns" onClick={handleDelete}>
                    Yes
                </a>
            </div>
        </ShowAlert>

        <ChangePassword display={state.changePasswordView}>
            <input type="password" name="password" className="alert-input-1" onChange={handlePasswordField} placeholder="Enter new password" />
            <input type="password" name="confirmPassword" className="alert-input-2" onChange={handlePasswordField} placeholder="Confirm password" />
            {error ? <p className="alert-error-text">{error}</p>: null}
            <div className="logout-btn-container">
                <a className="logout-btns" onClick={handlePasswordCancel}>
                    Cancel
                </a>
                <a className="logout-btns" onClick={handlePasswordChange}>
                    Change
                </a>
            </div>
        </ChangePassword>

        <ShowAlert display={state.resultCommentView} title="">
            <p className="comment-title">Principal's Comment</p>
            <select name="commentType" className="alert-input-2 comment-type" onChange={handleCommentField}>
            <option value="">select comment type</option>
                <option value="Teacher">Teacher's Comment</option>
                <option value="Principal">Principal's Comment</option>
            </select>
            <textarea type="text" name="adminComment" className="alert-input-2 comment-box" onChange={handleCommentField} placeholder="Comment on result"></textarea>
            <div className="logout-btn-container">
                <a className="logout-btns" onClick={()=> resultCommentView(false)}>
                    Cancel
                </a>
                <a className="logout-btns" onClick={handleAddComment}>
                    Comment
                </a>
            </div>
        </ShowAlert>

        <BroadcastMail display={state.mailView} title="Broadcast Mail">
            <input type="text" name="mailSubject" className="mail-input-1" onChange={handleMailField} placeholder="Mail subject" />
            <textarea name="mailContent" className="mail-input-2" onChange={handleMailField} placeholder="Enter your message"></textarea>
            <div className="logout-btn-container">
                <a className="logout-btns" onClick={() => toggleMailView(false)}>
                    Cancel
                </a>
                <a className="logout-btns" onClick={handleEmailSending}>
                    Send mail
                </a>
            </div>
        </BroadcastMail>

        {state.process ? <div className="request-shade">
            <Loader 
                type="Puff"
                color="#6d9c7d"
                height={100}
                width={100}
            />
        </div> : null}

        <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={AdminDashboard}></Route>
        <Route path="/teacher" component={TeacherDashboard}></Route>
        <Route path="/student" component={StudentDashboard}></Route>
        <Redirect from="/:id" to="/" />
        </Switch>
    </Router>
  )
}

export default App;
