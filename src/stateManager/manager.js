import React, {useReducer} from 'react'
import myAPI from '../API/Api'

const StateManager = React.createContext()

const stateReducer = (state, action) => {

    switch (action.type){

        case "store_user_data": 
            return {...state, user: action.payload}

        case "toggleProcess":
            return {...state, process: action.payload}
    }

}



export const StateProvider = (props) => {


    const [state, dispatch] = useReducer(stateReducer,{
        user: {}, process: false,
    })

    const signIn = async(history, username, password) => { 
        if(!username || !password){
            return alert("Kindly provide your username and password")
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
                alert(response.data.message)
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            alert("No network connection")
        }       
    }


    const signUp = async(body) => { 
        // if(!username || !password){
        //     return alert("Kindly provide your username and password")
        // }
        console.log("the body is : " + body)

        try{
            await dispatch({type: "toggleProcess", payload: true})
            const response = await myAPI.post('/addMember', body)
            await dispatch({type: "toggleProcess", payload: false})

            if(response.data.responseCode === "00"){
                alert("Member successfully created")
            }
            else{
                alert(response.data.message)
            }
        }
        catch(err){
            await dispatch({type: "toggleProcess", payload: false})
            alert("No network")
        }       
    }


    const boundActions = {
        signIn,
        signUp
    }


    return (
        <StateManager.Provider value={{state: state, ...boundActions}}>
            {props.children}
        </StateManager.Provider>
        )
}

export default StateManager