
const { combineReducers } = require("redux");
const {setAuth, setUserInfo } = require("./reducers");




const setReducers = combineReducers({
    token : setAuth,
    user : setUserInfo
})

export default setReducers;