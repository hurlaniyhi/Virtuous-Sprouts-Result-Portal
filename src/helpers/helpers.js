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
    }
}