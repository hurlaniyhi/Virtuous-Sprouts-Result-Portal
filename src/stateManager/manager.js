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

        case "handle-logout-confirmation": 
            return {...state, logoutView: action.payload.data, history: action.payload.history}

        case "handle-fetch-members": 
            return {...state, allMembers: action.payload}

        case "handle-member-profile": 
            return {...state, memberProfile: action.payload}

        case "clear-member-profile": 
            return {...state, memberProfile: null, allMembers: null}

        case "handle-set-profile-update": 
            return {...state, member: action.payload, operation: "edit"}

        case "handle-state-reset": 
            return action.payload

        case "handle-result-view": 
            return {...state, resultData: action.payload.result, resultID: action.payload.resultID}

        case "handle-user-recovery": 
            return {...state, user: action.payload}

        case "handle-instant-userData": 
            return {...state, userDetails: action.payload}

        case "handle-result-upload-data": 
            return {...state, editResultData: action.payload}

        case "handle-reset-some-states": 
            return {...state, member: action.payload.member, operation: action.payload.operation, 
                memberProfile: action.payload.memberProfile, resultData: action.payload.resultData}

        case "handle-reset-some-states2": 
            return {...state, editResultData: action.payload.editResultData}

        case "clear-result-to-upload": 
            return {...state, editResultData: action.payload}

        case "handle-password-field": 
            return {...state, passwordChangeFields: action.payload}

        case "handle-password-view": 
            return {...state, passwordChangeFields: null, changePasswordView: action.payload}

        case "handle-page-title": 
            return {...state, pageTitle: action.payload}

        default: return state
    }

}


export const StateProvider = (props) => {

    const [state, dispatch] = useReducer(stateReducer,{
        user: {}, process: false, feedbackView: false, feedbackColor: "#6d9c7d", feedbackTitle: "No Message",
        feedbackText: "No message for now", editResultData: {session: "", term: "", resultType: "", studentClass: "", resultId: null, studentName: "", result: null},
        member: {firstName: "", surname: "", email: "", phoneNumber: "", address: "", gender: "", 
        memberType: "", memberClass: ""}, alertView: false, alertText: "Nothing to show", logoutView: false,
        allMembers: null, memberProfile: null, operation: "", resultData: null, userDetails: {}, resultID: null,
        history: null, changePasswordView: false, passwordChangeFields: {}, pageTitle: ""
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

    const handleResultUploadData = async(data) => {
        await dispatch({type: "handle-result-upload-data", payload: data})
    }

    const resetSomeStates = async() => {
        await dispatch({type: "handle-reset-some-states", payload: helpers.resetSomeState()})
    }

    const resetSomeStates2 = async() => {
        await dispatch({type: "handle-reset-some-states2", payload: helpers.resetSomeState2()})
    }

    const pageTitle = async(data) => {
        await dispatch({type: "handle-page-title", payload: data})
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
                resetSomeStates()
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
        console.log({type: memberClass})
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
            const response = await myAPI.post('/get-result', body)
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                await dispatch({type: "handle-result-view", 
                payload: {result: response.data.result, resultID: response.data.resultID} })
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

    const instantUserDetails = async() => {
       let userData = await JSON.parse(localStorage.getItem("userData"))
       await dispatch({type: "handle-instant-userData", payload: userData})
    }


    const uploadResult = async(body) => {
        body.studentClass = state.user.memberClass
        body.teacherName = state.user.memberType

        console.log({payload: body})

        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/upload-result', body)
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                presentFeedback(helpers.successAlert(response.data.message))
                await dispatch({type: "clear-result-to-upload", payload: {...state.editResultData, result: null}})
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

    const updateResult = async(history) => {
        let resultId
        if(state.editResultData.resultType === "Test"){
            if(!state.resultID.testId){
                return infoNotifier(helpers.alertInfo("Test result to be updated did not exist"))
            }
            else{
                resultId = state.resultID.testId
            }
        }
        else if(state.editResultData.resultType === "Exam"){
            if(!state.resultID.examId){
                return infoNotifier(helpers.alertInfo("Exam result to be updated did not exist"))
            }
            else{
                resultId = state.resultID.examId
            }   
        }
        
        let requestPayload = {...state.editResultData, resultId, updatedResult: state.editResultData.result, memberType: "Admin"}
        console.log(requestPayload)
        let body = {...state.editResultData}
        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/edit-result', requestPayload)

            if(response.data.responseCode === "00"){
                console.log({newResult: response.data.updatedResult})
                //....................................................
                const response2 = await myAPI.post('/get-result', body)
                await dispatch({type: "toggleProcess", payload: false})

                if(response2.data.responseCode === "00"){
                    await dispatch({type: "handle-result-view", 
                    payload: {result: response2.data.result, resultID: response2.data.resultID} })

                    presentFeedback(helpers.successAlert(response.data.message))
                    history.push('/admin/result-view')
                }
                else{
                    presentFeedback(helpers.successAlert(response.data.message))
                }
            }
            else{
                await dispatch({type: "toggleProcess", payload: false})
                presentFeedback(helpers.errorAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }
    }

    const deleteResult = async(requestPayload) => {
        
        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/delete-result', requestPayload)
            await dispatch({type: "toggleProcess", payload: false})
    
            if(response.data.responseCode === "00"){
                await dispatch({type: "handle-result-view", 
                payload: {result: null, resultID: null} })
                presentFeedback(helpers.successAlert(response.data.message))
            }
            else{
                presentFeedback(helpers.errorAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo(err))
        }
    }

    const passwordFieldChange = async(data) => {
        await dispatch({type: "handle-password-field", payload: data})
    }

    const recoverUser = async() => {
        let user = await JSON.parse(localStorage.getItem("userData"))
        await dispatch({type: "store_user_data", payload: user})
        console.log(user.firstName)
    }

    const logoutConfirmation = async(data, history) => {
        await dispatch({type: "handle-logout-confirmation", payload: {data, history}})
    }

    const changePasswordView = async(data) => {
        await dispatch({type: "handle-password-view", payload: data})
    }

    const changePassword = async() => {

        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/changePassword',
            {username: state.user.username, password: state.passwordChangeFields.password})
            await dispatch({type: "toggleProcess", payload: false})
           
            passwordFieldChange(null)
            changePasswordView(false)
            if(response.data.responseCode === "00"){
                presentFeedback(helpers.successAlert(response.data.message))
            }
            else{
                presentFeedback(helpers.successAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            infoNotifier(helpers.alertInfo("No network connection"))
        }
    }

    const signOut = async() => {
        await logoutConfirmation(false, null)
        localStorage.clear()
        state.history.push("/")
        await dispatch({type: "handle-state-reset", payload: helpers.errorAlert()})
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
        instantUserDetails,
        handleResultUploadData,
        uploadResult,
        updateResult, 
        deleteResult,
        recoverUser,
        logoutConfirmation,
        resetSomeStates,
        resetSomeStates2,
        passwordFieldChange,
        changePasswordView,
        changePassword,
        pageTitle,
        signOut
    }


    return (
        <StateManager.Provider value={{state: state, ...boundActions}}>
            {props.children}
        </StateManager.Provider>
        )
}

export default StateManager