
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

const ApplicationRoutes = () => {


  const [collapse, setCollapse] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const token = useSelector(state => state.token);

  return (
    <Router>      
              <Switch>
              { (token != 1) ? (
              <><Redirect from="/login" to="/mainPage" /> 
              <Route path="/mainPage" component={MainPage} /> </>) :  (
              <><Route path="/login" component={LoginPage} />
                 <Redirect from="/mainPage" to="/login" /> </>
                  )}
                
                <Redirect from="/" to="/login" />
                
              </Switch>            
    </Router>
  );
};

export default ApplicationRoutes;
