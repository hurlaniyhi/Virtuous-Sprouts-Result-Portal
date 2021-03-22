import React, {useReducer} from 'react'
import myAPI from '../API/Api'
import {helpers} from '../helpers/helpers'

const StateManager = React.createContext()

const stateReducer = (state, action) => {

    switch (action.type){

        case "store_user_data": 
        console.log({user: action.payload})
            return {...state, user: action.payload}

        case "toggleProcess":
            return {...state, process: action.payload}

        case "handle-feedback":
            return {...state, feedbackView: action.payload.view, feedbackColor: action.payload.color, 
                feedbackTitle: action.payload.title, feedbackText: action.payload.text}
        
        case "handle-select-field": 
            return {...state, member: action.payload}

        case "handle-alert": 
            return {...state, alertView: action.payload.view, alertText: action.payload.text}

        case "handle-fetch-members": 
            return {...state, allMembers: action.payload}

        case "handle-member-profile": 
            return {...state, memberProfile: action.payload}

        case "clear-member-profile": 
            return {...state, memberProfile: null, allMembers: []}

        case "handle-set-profile-update": 
            return {...state, member: action.payload, operation: "edit"}

        case "handle-state-reset": 
            return action.payload

        case "handle-result-view": 
        console.log({result: action.payload})
            return {...state, resultData: action.payload}

        default: return state
    }

}


export const StateProvider = (props) => {

    const [state, dispatch] = useReducer(stateReducer,{
        user: {}, process: false, feedbackView: false, feedbackColor: "#6d9c7d", feedbackTitle: "No Message",
        feedbackText: "No message for now", 
        member: {firstName: "", surname: "", email: "", phoneNumber: "", address: "", gender: "", 
        memberType: "", memberClass: ""}, alertView: false, alertText: "Nothing to show",
        allMembers: [], memberProfile: null, operation: "", resultData: [] 
    })

    async function presentFeedback(data){
        await dispatch({type: "handle-feedback", payload: data})
    }

    async function infoNotifier(data){
        await dispatch({type: "handle-alert", payload: data})
    }

    const handleMemberSelectField = async(data) => {
        await dispatch({type: "handle-select-field", payload: data})
    }


    const signIn = async(history, username, password) => { 
        if(!username || !password){
            return infoNotifier(helpers.alertInfo("Kindly provide your username and password"))
        }

        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/login', {username, password})
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                await dispatch({type: "store_user_data", payload: response.data.profile})
                await localStorage.setItem("token", response.data.token)
                await localStorage.setItem("userData", JSON.stringify(response.data.profile))
                await localStorage.setItem("firstName", response.data.profile.firstName)
                await localStorage.setItem("memberType", response.data.profile.memberType)
                if(response.data.profile.memberType === "Teacher"){
                    history.push("/teacher")
                }
                else if(response.data.profile.memberType === "Student"){
                    history.push("/student")
                }
                else{
                    history.push("/admin")
                }
                
            }
            else{
                presentFeedback(helpers.errorAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }       
    }


    const signUp = async(body) => { 
       
        if(!body.firstName || !body.surname || !body.email || !body.memberType || !body.phoneNumber
            || !body.address || !body.memberClass || !body.gender){
                return infoNotifier(helpers.alertInfo("Kindly provide all required information"))
        }

        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/addMember', body)
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                presentFeedback(helpers.successAlert("Member successfully added"))
            }
            else{ 
                presentFeedback(helpers.errorAlert(response.data.message))
                console.log({response: response.data})
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }       
    }

    const fetchAllMembers = async(memberClass) => {
        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/fetchMembers', {memberClass})
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                await dispatch({type: "handle-fetch-members", payload: response.data.info})
                if(response.data.info.length < 1){
                    infoNotifier(helpers.alertInfo("No member in this class"))
                }
            }
            else{ 
                presentFeedback(helpers.errorAlert(response.data.message))
            }
            
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }
    }

    const getMemberProfile = async(data) => {
        await dispatch({type: "handle-member-profile", payload: data})
    }

    const setProfileUpdate = async(route, history) => {
        await dispatch({type: "handle-set-profile-update", payload: state.memberProfile})
        history.push(route)
    }

    const editMemberProfile = async(body, history) =>{
        if(!body.firstName || !body.surname || !body.email || !body.memberType || !body.phoneNumber
            || !body.address || !body.memberClass || !body.gender){
                return infoNotifier(helpers.alertInfo("Kindly provide all required information"))
        }
        body.id = body._id

        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/updateMember', body)
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                getMemberProfile(response.data.info)
                presentFeedback(helpers.successAlert(response.data.message))
                history.push("/admin/member-profile")
            }
            else{ 
                presentFeedback(helpers.errorAlert(response.data.message))
            }
            
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }
    }

    const memberDelete = async() => {
        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/deleteMember', {id: state.memberProfile._id})
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                await dispatch({type: "clear-member-profile"})
                presentFeedback(helpers.successAlert(response.data.message))
            }
            else{ 
                presentFeedback(helpers.errorAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }
    }

    const studentProfile = async(history) => {
       let userData = await JSON.parse(localStorage.getItem("userData"))
        
        getMemberProfile(userData)
    }

    const fetchStudentResult = async(body) => {
        if(!body.studentName || !body.studentClass || !body.session || !body.term){
            return infoNotifier(helpers.alertInfo("Kindly provide all required details"))
        }

        try{
            console.log({body})
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.get('/get-result', body)
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                await dispatch({type: "handle-result-view", payload: response.data.result})
            }
            else{
                presentFeedback(helpers.errorAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }
    }

    const signOut = async(history) => {
        await dispatch({type: "handle-state-reset", payload: helpers.errorAlert()})
        localStorage.clear()
        history.push("/")
    }


    const boundActions = {
        signIn,
        signUp,
        presentFeedback,
        handleMemberSelectField,
        infoNotifier,
        fetchAllMembers,
        getMemberProfile,
        setProfileUpdate,
        editMemberProfile,
        memberDelete,
        studentProfile,
        fetchStudentResult,
        signOut
    }


    return (
        <StateManager.Provider value={{state: state, ...boundActions}}>
            {props.children}
        </StateManager.Provider>
        )
}

export default StateManager