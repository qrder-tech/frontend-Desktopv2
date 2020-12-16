
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/mainFrames/LoginPage";
import MainPage from "./components/mainFrames/MainPage";
import { useSelector } from "react-redux";
import RegisterPage from "./components/mainFrames/RegisterPage";

const ApplicationRoutes = () => {


  const [collapse, setCollapse] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const token = useSelector(state => state.token);

  return (
    <Router>      
              { (token != 1 && token != "undefined") ? (
                //Autheticated Routing
                <Switch>
                   <Route path="/mainPage" component={MainPage}/>
                   <Redirect from="/login" to="/mainPage" /> 
                   <Redirect from="/register" to="/mainPage" />                   
                   <Redirect from="/" to="/mainPage" />
                </Switch>
              ) :  (
                //Unauthenticated Routing
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />                  
                  <Redirect from="/mainPage" to="/login" /> 
                  <Redirect from="/" to="/login" /> 
                </Switch>
              
                  )}
                  
    </Router>
  );
};

export default ApplicationRoutes;
