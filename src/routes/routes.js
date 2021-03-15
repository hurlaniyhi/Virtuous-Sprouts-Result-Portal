import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import Login from "../components/LoginPage"
import AdminDashboard from '../components/AdminDAshboard/AdminDashboard'

function App() {
  return (
    <Router>
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
