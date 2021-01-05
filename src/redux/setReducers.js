
const { combineReducers } = require("redux");
const {setAuth, setUserInfo, setOrderList, setPanelList, setDisplay, setRestaurantMenu, setRestaurantTables, setTabDisplayValue, setTest, setTest2 } = require("./reducers");




const setReducers = combineReducers({
    token : setAuth,
    user : setUserInfo,
    orders : setOrderList,
    display : setDisplay,
    menu : setRestaurantMenu,
    tables : setRestaurantTables,
    displayValue : setTabDisplayValue,
    mqtt : setTest,
    tableUpdate : setTest2
})

export default setReducers;