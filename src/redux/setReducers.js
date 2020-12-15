
const { combineReducers } = require("redux");
const {setAuth, setUserInfo, setOrderList, setPanelList, setDisplay, setRestaurantMenu, setRestaurantTables } = require("./reducers");




const setReducers = combineReducers({
    token : setAuth,
    user : setUserInfo,
    orders : setOrderList,
    display : setDisplay,
    menu : setRestaurantMenu,
    tables : setRestaurantTables
})

export default setReducers;