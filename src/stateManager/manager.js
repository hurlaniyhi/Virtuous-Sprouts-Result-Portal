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

        default: return state
    }

}


export const StateProvider = (props) => {

    const [state, dispatch] = useReducer(stateReducer,{
        user: {}, process: false, feedbackView: false, feedbackColor: "#6d9c7d", feedbackTitle: "No Message",
        feedbackText: "No message for now", 
        member: {firstName: "", surname: "", email: "", phoneNumber: "", address: "", gender: "", 
        memberType: "", memberClass: ""}, alertView: false, alertText: "Nothing to show"
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
                await localStorage.setItem("username", response.data.profile.username)
                history.push("/admin")
            }
            else{
                presentFeedback(helpers.errorAlert(response.data.message))
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            presentFeedback(helpers.errorAlert("No network connection"))
        }       
    }


    const signUp = async(body) => { 
        if(!body.firstname || !body.surname || !body.email || !body.memberType || !body.phoneNumber
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
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            presentFeedback(helpers.errorAlert("No network connection"))
        }       
    }



    const boundActions = {
        signIn,
        signUp,
        presentFeedback,
        handleMemberSelectField,
        infoNotifier
    }


    return (
        <StateManager.Provider value={{state: state, ...boundActions}}>
            {props.children}
        </StateManager.Provider>
        )
}

export default StateManager