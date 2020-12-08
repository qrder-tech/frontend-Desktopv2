import React from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import LeftDrawer from "../drawers/LeftDrawer";
import RightDrawer from "../drawers/RightDrawer";
import OrderPanel from "../mainPanels/OrderPanel";



class MainPage extends React.Component {
  state = {
    value: 0,
    drawerStyle:null
  };

  componentDidMount() {

    console.log(`token : ${localStorage.getItem("token")} -- user : ${localStorage.getItem("user")}` );

  }

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {

    return (
        <div className="App">   
        
        <div className = "App-Main">
          <LeftDrawer/> 
          <RightDrawer/>    
          <header className="App-Header">
                  <h1 className="title">Qrder</h1>
                  <AppBar position="static" className="Tab-Length">
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleTabChange.bind(this)}
                      aria-label="simple tabs example"
                      variant="fullWidth"
                      classes={{
                        root: "Tab-Color",
                        indicator: "Indicator-Color",
                      }}
                      indicatorColor=""
                    >
                      <Tab label="Tables" {...a11yProps(0)} />
                      <Tab label="Orders" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>    
          </header>
          <body className="App-body">
            <div className="Panel">
              <div className="MainPanel">
                <TabPanel value={this.state.value} index={0}>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  <OrderPanel />
                </TabPanel>
              </div>
            </div>
          </body>
          
          </div>    
        </div>
        
    );
  }
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default withRouter(MainPage);
