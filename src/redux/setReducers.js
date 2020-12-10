
const { combineReducers } = require("redux");
const {setAuth, setUserInfo, setOrderList, setPanelList, setDisplay, setRestaurantMenu } = require("./reducers");




const setReducers = combineReducers({
    token : setAuth,
    user : setUserInfo,
    orders : setOrderList,
    display : setDisplay,
    menu : setRestaurantMenu
})

export default setReducers;