
//Action that set Authentication token for Redux
export const setToken = (token) =>{
    
    localStorage.setItem("token", token);

    return{
        type: 'setAuthToken',
        token : token
    }
}

export const setUser = (user) =>{
    
    localStorage.setItem("user", JSON.stringify(user));
    return{
        type: 'setUserInfo',
        info : user
    }
}

export const setOrders = (orders) =>{
    return{
        type: 'setOrders',
        orders : orders
    }
}


export const setDisplayingPanel = (panel) =>{
    
    return{
        type : "setDisplayingPanel",
        panel : panel
    }
}

export const setDisplayValue = (value) =>{
    return{
        type: "SetDisplayValue",
        value : value
    }
}

export const setMenu = (menu) =>{
    return{
        type : "setMenu",
        menu : menu
    }
}

export const setTables = (tables) =>{    
    console.log(tables);
    return {
        type : "setTables",
        tables : tables
    }
}

export const test = (message) =>{
    return{
        type : "test",
        message : message
    }

}

export const test2 = (callback) =>{
    return{
        type : "test2",
        callback : callback
    }

}