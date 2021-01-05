
//Reducer that manages set actions with Redux
export const setAuth = (state = "1", action) =>{
    switch(action.type){
        case "setAuthToken" : // authentication set action
            return action.token;
        default :
            return state;
    }
}

export const setUserInfo = (state = "", action) =>{
    switch(action.type){
        case "setUserInfo" : // authentication set action
            return action.info;
        default :
            return state;
    }
}

export const setOrderList = (state = [], action) =>{
    switch(action.type){
        case "setOrders" : // authentication set action
            return action.orders;
        default :
            return state;
    }
}

export const setDisplay = (state = null, action) =>{
    switch(action.type){
        case "setDisplayingPanel" : 
            return action.panel;
        default : 
            return state;
    }
}

export const setTabDisplayValue = (state = 0,action)=>{
    switch(action.type){
        case "SetDisplayValue":
            return action.value;
        default:
            return state;
    }
}

export const setRestaurantMenu = (state = [] , action) => {
    switch(action.type){
        case "setMenu" : 
            return action.menu;
        default : 
            return state;
    }
}

export const setRestaurantTables = (state = [] , action) =>{
    switch(action.type){
        case "setTables" :
            return action.tables;
        default :
            return state;
    }
}

export const setTest = (state = "" , action) =>{
    switch(action.type){
        case "test":
            return action.message;
        default :
            return state;
    }

}

export const setTest2 = (state = "" , action) =>{
    switch(action.type){
        case "test2":
            return action.callback;
        default :
            return state;
    }

}