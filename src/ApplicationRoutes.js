
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/mainFrames/LoginPage";
import MainPage from "./components/mainFrames/MainPage";

const ApplicationRoutes = () => {

  const [collapse, setCollapse] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };
  

  return (
    <Router>      
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/mainPage" component={MainPage} />
                <Redirect from="/" to="/login" />
              </Switch>            
    </Router>
  );
};

export default ApplicationRoutes;
