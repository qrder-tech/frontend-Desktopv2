
//Reducer that manages set actions with Redux
export const setAuth = (state = "1", action) =>{
    switch(action.type){
        case "setAuthToken" : // authentication set action
            return action.token;
        default :
            return "1";
    }
}

export const setUserInfo = (state = "", action) =>{
    switch(action.type){
        case "setUserInfo" : // authentication set action
            return action.info;
        default :
            return "";
    }
}