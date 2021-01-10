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
import { setDisplayingPanel, setUser } from "../../redux/actions";
import TablePanel from "../mainPanels/tables/TablePanel";
import resClient from "../../mqtt/client"
import { getUserInfo } from "../../requests/restaurant";
import { Receipt } from "@material-ui/icons";

var QRCode = require('qrcode.react');

class MainPage extends React.Component {
  state = {
    value: 0,
    drawerStyle:null,
    userInfo : {
    },
    restaurantUuid : null,
    compListener : null
  };

  componentWillUnmount(){
    document.removeEventListener("tab", this.state.compListener);
   }

   updateTab = (tab) =>{
     console.log(tab);
     this.setState({value:parseInt(tab)});
   }

  componentDidMount() {
    
    var compListener = (tab)=>{this.updateTab(tab.detail)};
    this.setState({compListener:compListener}); 
    document.addEventListener("tab",compListener);
    if(this.props.user){
      resClient.init(this.props.token,this.props.user.uuid);
      this.setState({userInfo:this.props.user,restaurantUuid:this.props.user.uuid});
    }else{
      getUserInfo(this.props.token).then((response)=>{
        console.log(response);
        this.props.dispatch(setUser(response));
        this.setState({userInfo:response,restaurantUuid:response.uuid});
        resClient.init(this.props.token,response.uuid);
      });
    }
    

  }

  downloadQR = () =>{
    const canvas = document.getElementById(`mainqr${this.props.user.uuid}`);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
                  <h1 className="title2">{this.state.userInfo.name}</h1>                                   
                  
                  <h1 className="title3">
                    {this.state.userInfo.email}
                    <br/>
                    {this.state.userInfo.phoneNumber}
                    <br/>
                    {this.state.userInfo.address}
                  </h1>
                  
                  <div className="title4">
                    <QRCode id={`mainqr${this.state.restaurantUuid}`} value={`${this.state.restaurantUuid}`} size="100" bgColor="#837032" fgColor="#282c34e8"/>                
                  </div>
                  <div className="title5"><a style={{cursor:"pointer"}}onClick={this.downloadQR}>Download QR</a></div>
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
              <div className="MainPanel" style={{position:"relative"}}>
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
