export const helpers = {
    successAlert: function(message){
        return {
            view: true, color: "#6d9c7d", title: "Success", text: message
        }
    },
    errorAlert: function(message){
        return {
            view: true, color: "red", title: "Error", text: message
        }
    },
    alertInfo: function(message){
        return {
            view: true, text: message
        }
    },
    resetState: function(){
        return {
            user: {}, process: false, feedbackView: false, feedbackColor: "#6d9c7d", feedbackTitle: "No Message",
            feedbackText: "No message for now", 
            member: {firstName: "", surname: "", email: "", phoneNumber: "", address: "", gender: "", 
            memberType: "", memberClass: ""}, alertView: false, alertText: "Nothing to show",
            allMembers: [], memberProfile: null, operation: "" 
        }
    },
    resetSomeState: function(){
        return {
            member: {firstName: "", surname: "", email: "", phoneNumber: "", address: "", gender: "", 
            memberType: "", memberClass: ""},
            operation: "",
            memberProfile: null,
            resultData: null,
            editResultData: {session: "", term: "", resultType: "", studentClass: "", resultId: null, 
            studentName: "", result: null}
        }
    },
    resetSomeState2: function(){
        return {
            editResultData: {session: "", term: "", resultType: "", studentClass: "", resultId: null, 
            studentName: "", result: null},
        }
    },
    academicSessions: function(){
        let year = new Date().getFullYear()
        let academicSessions = []
        let startingYear = 2020
        while(year >= startingYear && academicSessions.length != 10 ){
            let sessionString = `${year}/${year+1}`
            academicSessions.push(sessionString)
            year--
        }
        return academicSessions
    }
}