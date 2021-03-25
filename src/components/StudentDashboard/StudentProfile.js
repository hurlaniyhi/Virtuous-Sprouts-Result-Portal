import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import StateManager from '../../stateManager/manager'
import Profile from '../reusable/profile'


const MyProfile = () => {
    const history = useHistory()
    const {state, studentProfile} = useContext(StateManager)

    useEffect(()=>{
        studentProfile(history)
    }, [])

    return(
        <Profile route="/student" resultRoute="/student/result-view"/>
    )
}
export default MyProfile