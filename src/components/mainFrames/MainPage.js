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
import { connect } from "react-redux";
import { setDisplayingPanel } from "../../redux/actions";
import TablePanel from "../mainPanels/tables/TablePanel";



class MainPage extends React.Component {
  state = {
    value: -1,
    drawerStyle:null
  };

  componentDidMount() {
    
  }

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
    if(newValue == 0){
      
      this.props.dispatch(setDisplayingPanel(<OrderPanel/>));
    }else{
      
      this.props.dispatch(setDisplayingPanel(<TablePanel/>));
    }
  };

  setDisplay = (display)=>{
      this.props.dispatch(setDisplayingPanel(display))
  }

  render() {

    console.log("hi");
    

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
                      <Tab label="Orders" {...a11yProps(0)} />
                      {this.props.user== null ? null:this.props.user.serviceType == "normal"?<Tab label="Tables" {...a11yProps(1)} />:null}                      
                      
                    </Tabs>
                  </AppBar>    
          </header>
          <body className="App-body">
            <div className="Panel">
              <div className="MainPanel">
                {this.props.display}                
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
const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  display : state.display,
  displayValue : state.value
})
export default connect(mapStateToProps,null)(withRouter(MainPage));
