import React from "react"

import {  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,  withStyles } from "@material-ui/core";
import { AccountBalanceWallet,  CheckBox,  Face,  HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import MainPage from "../mainFrames/MainPage";
import { setDisplayingPanel, setUser } from "../../redux/actions";
import { getMetrics, getUserInfo } from "../../requests/restaurant";

var QRCode = require('qrcode.react');

class RightDrawer extends React.Component {

  state ={
    open : false,
    items : [],
    tableStatus : [],
    compListener :null,
    serviceType : null,
    restaurantUuid : null
  }

  componentWillUnmount(){
    document.removeEventListener("table", this.state.compListener);
    document.removeEventListener("order", this.state.compListener);
   }

  componentDidMount(){

    var compListener = ()=>{this.updateDrawer()};
    this.setState({compListener:compListener});
    document.addEventListener("table",compListener);    
    document.addEventListener("order",compListener);
    this.updateDrawer();
    if(this.props.user){
      this.setState({serviceType:this.props.user.serviceType});
      this.setState({restaurantUuid : this.props.user.uuid});
    }else{
      getUserInfo(this.props.token).then((response)=>{
        this.props.dispatch(setUser(response));
        this.setState({serviceType:response.serviceType});
        this.setState({restaurantUuid : response.uuid});
      });
    }
  }

  updateDrawer = () =>{
    var items =[];
    var tableStatus = [];
    if(this.props.user != null){
      getMetrics(this.props.token).then((response)=>{
        console.log(response.data);
        if(response.data.orders){
          if(this.props.user.serviceType == "normal"){             
            items = [
              {text:"Done" , item:<CheckBox style={{fontSize:90}}/>,count:response.data.orders.served},
              {text : "Waiting" , item:<HourglassFull style={{fontSize:90}}/>,count : response.data.orders.waiting},
              {text : "Payment" , item:<AccountBalanceWallet style={{fontSize:90}}/>,count : response.data.services.payment},
              {text:"Waiter" , item:<Face style={{fontSize:90}}/>,count : response.data.services.waiter}];
              tableStatus=[{text:"Occupied Tables",count:response.data.tables.occupied},
              {text:"Free Tables",count:response.data.tables.free},
              {text:"Most Delayed Table",count:response.data.tables.mostDelayedNo}];
              this.setState({tableStatus});
          }else{
            items = [{text:"Done" , item:<CheckBox style={{fontSize:90}}/>,count:response.data.orders.served},
            {text : "Waiting" , item:<HourglassFull style={{fontSize:90}}/>,count : response.data.orders.waiting}];
          }
          this.setState({items});
        }
      });
    }else{
      getUserInfo(this.props.token).then((result)=>{
        
        this.props.dispatch(setUser(result));
        getMetrics(this.props.token).then((response)=>{
          console.log(response.data);
          if(response.data.orders){
            if(result.serviceType == "normal"){             
              items = [
                {text:"Done" , item:<CheckBox style={{fontSize:90}}/>,count:response.data.orders.served},
                {text : "Waiting" , item:<HourglassFull style={{fontSize:90}}/>,count : response.data.orders.waiting},
                {text : "Payment" , item:<AccountBalanceWallet style={{fontSize:90}}/>,count : response.data.services.payment},
                {text:"Waiter" , item:<Face style={{fontSize:90}}/>,count : response.data.services.waiter}];
                tableStatus=[{text:"Occupied Tables",count:response.data.tables.occupied},
                {text:"Free Tables",count:response.data.tables.free},
                {text:"Most Delayed Table",count:response.data.tables.mostDelayedNo}];
                this.setState({tableStatus});
            }else{
              items = [{text:"Done" , item:<CheckBox style={{fontSize:90}}/>,count:response.data.orders.served},
              {text : "Waiting" , item:<HourglassFull style={{fontSize:90}}/>,count : response.data.orders.waiting}];
            }
            this.setState({items});
          }
        });
    });

    }
  }

  downloadQR = () =>{
    const canvas = document.getElementById(`qr${this.props.user.uuid}`);
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


  clickhandler(item){
    alert(item.text + " : " + item.count );
    
  }

  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };

  render() {
    const { classes } = this.props;
    
    return (
      <Drawer anchor="right"variant="permanent" classes={{paper:classes.paper}}>
          <div className="Drawer">
          <List >
            <ListItem>
              <ListItemText style={{color:"black"}}>{(this.state.serviceType == "self")?
              ( <> &nbsp;&nbsp;&nbsp;&nbsp;
                <QRCode id={`qr${this.state.restaurantUuid}`} value={`${this.state.restaurantUuid}`} bgColor="#837032" fgColor="#282c34e8"/>
                &nbsp;&nbsp;&nbsp;&nbsp;<a style={{cursor:"pointer"}}onClick={this.downloadQR}>Download QR</a></>
                                     ):(<p style={{fontSize:15}}>
                  {this.state.tableStatus.map((title)=>{return <>{`${title.text} : ${title.count}`}<hr className="Test4"/></>})}
                  </p>)}                
                </ListItemText>
            </ListItem>
            <Divider classes={{root : classes.divider}}/>
          {this.state.items.map((text,index) => (
            <>
              <ListItem key={text} onClick={()=>this.clickhandler(this.state.items[index])} classes={{root:classes.padding}}> 
                 <ListItemIcon  style={{color:"#282c34e8"}}>
                  {this.state.items[index].item}
                </ListItemIcon>
                <ListItemText style={{color:"black"}}><p style={{fontSize:30,marginLeft:"40px"}}>{this.state.items[index].count}</p></ListItemText>
              </ListItem>
              <Divider classes={{root : classes.divider}}/>
              </>
            ))}
          </List>
          </div>
        </Drawer>
    );
  
  }

}



const useStyles ={
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  paper: {
    
    backgroundColor: "#c4a748d0",
    overflowX: 'hidden',
    width: 200,
  },
  icon:{
    backgroundColor:"#282c34e8",
    
  },
  padding:{
    justifyContent:"center",
    },
    padding2:{
      justifyContent:"center",
      
    },
    divider:{
      backgroundColor:"black"
    }
  
};

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  display : state.display,
  displayValue : state.value
})

export default connect(mapStateToProps,null)(withStyles(useStyles)(RightDrawer))