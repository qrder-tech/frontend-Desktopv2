
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