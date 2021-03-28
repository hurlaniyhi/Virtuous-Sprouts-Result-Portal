import React, {useContext, useEffect} from 'react'
import StateManager from '../../stateManager/manager'
import Home from '../reusable/Home'

const AdminHome = () => {
    
    const {state, handleMemberSelectField, resetSomeStates} = useContext(StateManager)

    useEffect(()=>{
        resolveRegistrationIssue()
        document.title = "Admin Home Page"
        return () => {
            resetSomeStates();
          };
    }, [])

    
    async function resolveRegistrationIssue(){
        handleMemberSelectField({firstName: "", surname: "", email: "", phoneNumber: "", address: "", 
        gender: "", memberType: "", memberClass: ""})
    }

    return(
        <Home 
        navRoute="/admin/add-member" 
        containerClass="admin-home-container"
        greeting="Hi,"
        notification="This is Admin."
        buttonText="Add New Member"
        buttonClass="add-member"
        introContainer="home-intro-container"
        />
    )
}
export default AdminHome