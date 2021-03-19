import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import StateManager from '../stateManager/manager'
import ShowFeedback from '../components/reusable/showFeedback'
import ShowAlert from '../components/reusable/showAlert'
import LandingPage from '../components/LandingPage'
import Login from "../components/LoginPage"
import AdminDashboard from '../components/AdminDAshboard/AdminDashboard'

function App() {
    const {state, presentFeedback, infoNotifier} = useContext(StateManager)
  return (
    <Router>
        <ShowFeedback display={state.feedbackView} color={state.feedbackColor} text={state.feedbackText} 
                title={state.feedbackTitle}>
                <a className="feedback-btn" style={{backgroundColor: state.feedbackColor}} onClick={()=>
                    presentFeedback({view: false, color: "", title: "", text: ""})}>
                    Ok
                </a>
        </ShowFeedback>

        <ShowAlert display={state.alertView} text={state.alertText}>
            <a className="alert-btn" onClick={()=>
                infoNotifier({view: false, text: ""})}>
                Ok
            </a>
        </ShowAlert>

        <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={AdminDashboard}></Route>
        {/*<Route path="/staff" component={StaffDashboard}></Route>
        <Route path="/resolve" component={ResolveAuth}></Route> */}
        <Redirect from="/:id" to="/" />
        </Switch>
    </Router>
  )
}

export default App;
