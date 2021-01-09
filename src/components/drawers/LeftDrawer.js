
import React from "react"
import {  Divider, Drawer,  List, ListItem, ListItemIcon, ListItemText,  withStyles } from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AccountCircle,  Edit, Fastfood, MenuBook, Settings } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setDisplayingPanel, setToken, setUser } from "../../redux/actions";
import MenuPanel from "../mainPanels/MenuPanel";
import ItemPanel from "../mainPanels/Item/ItemPanel";
import OrderCreatePanel from "../mainPanels/order/OrderCreatePanel";
import ProfileEditPanel from "../mainPanels/ProfileEditPanel";

class LeftDrawer extends React.Component {

  state ={
    open : false
  }

  clickhandler(text){
    
    const { history ,match} = this.props;
    switch(text){
      case "Logout":
        console.log(localStorage);
        this.props.dispatch(setToken("1"));
        this.props.dispatch(setUser(""));   
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        history.push("/login");
      case "Menu":
        console.log("menu");
        this.props.dispatch(setDisplayingPanel(<MenuPanel/>));
        break;
      case "AddItem":        
        console.log("item");
        this.props.dispatch(setDisplayingPanel(<ItemPanel id="itemPanelDrawer"/>));
        break;        
      case "AddOrder":        
        console.log("order");        
        this.props.dispatch(setDisplayingPanel(<OrderCreatePanel/>));
        
        break;
      case "Edit":        
        this.props.dispatch(setDisplayingPanel(<ProfileEditPanel/>));
        break;
      default:
        alert("hi " + text);
        
    }
    /*if(text == "Logout"){ 
      console.log(localStorage);
      this.props.dispatch(setToken("1"));
      this.props.dispatch(setUser(""));   
      localStorage.removeItem("token");
      localStorage.removeItem("user");
       
      history.push("/login");   
    }else if(text == "Menu"){   
      this.props.dispatch(setDisplayingPanel(<MenuPanel/>));

    }else{      
      alert("hi " + text);
      //alert(token);
    }*/
  }
  
  handleLogout(){
      
    const { history ,match} = this.props;

    history.push("/mainPage");

  }

  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };

  render() {
    const { classes } = this.props;
    
    const items = [{text:"User" , item:<AccountCircle style={{fontSize:145}}/>},
                    {text : "Edit" , item:<Edit style={{fontSize:70}}/>,label:"Edit"},
                   {text : "Menu" , item:<MenuBook style={{fontSize:70}}/>,label:"Menu"},
                   {text : "AddItem" , item:<Fastfood style={{fontSize:70}}/>,label:"AddItem"},
                   {text : "AddOrder" , item:<><Fastfood style={{fontSize:20}}/><Fastfood style={{fontSize:50}}/></>,label:"AddOrder"}];
    return (
      <Drawer anchor="left"variant="permanent" classes={{paper:classes.paper}}>
          <div className="Drawer">
          <List >
          {items.map((text,index) => (
              <ListItem button key={text} onClick={()=>this.clickhandler(items[index].text)} classes={{root:classes.padding}}> 
                <ListItemIcon  classes={{root:classes.padding2}}style={{color:"#c4a748d0"}}>
                  {items[index].item}
                </ListItemIcon>  
                <ListItemText ><p style={{marginLeft:"10px"}}>{items[index].label}</p></ListItemText>
              </ListItem>
            ))}
         
            
          <Divider classes={{root: classes.divider}}/>
              <ListItem button key="Logout" onClick={()=>this.clickhandler("Logout")} classes={{root:classes.padding}}style={{backgroundColor:"#c4a748d0"}}>
                <ListItemIcon  classes={{root:classes.padding2}} style={{color:"#282c34e8"}}>
                  <ExitToAppIcon style={{fontSize:70}}/> 
                </ListItemIcon>
                <ListItemText><p style={{marginLeft:"10px"},{color : "#282c34e8"}}>Logout</p></ListItemText>
              </ListItem>            
          <Divider classes={{root: classes.divider}}/>
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
    backgroundColor: "#282c34e8",
    overflowX: 'hidden',
    width: 200,
  },
  paper2: {
    backgroundColor: "#ffffff",
    overflowX: 'hidden',
    width: 200,
  },
  icon:{
    backgroundColor:"#c4a748d0",
    
  },
  padding:{
    justifyContent:"center",
    },
    padding2:{
      justifyContent:"center"
    },
    divider:{
      backgroundColor:"#c4a748d0"
    }
  
};

const drawerWidth = 240;

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  display : state.display
})

export default connect(mapStateToProps,null)(withRouter(withStyles(useStyles)(LeftDrawer)));