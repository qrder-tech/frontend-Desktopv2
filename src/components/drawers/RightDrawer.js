import React from "react"

import {  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,  withStyles } from "@material-ui/core";
import { AccountBalanceWallet,  CheckBox,  Face,  HourglassFull } from "@material-ui/icons";

class RightDrawer extends React.Component {

  state ={
    open : false
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
    
    const items = [{text:"Done" , item:<CheckBox style={{fontSize:90}}/>,count:3},
                    {text : "Payment" , item:<AccountBalanceWallet style={{fontSize:90}}/>,count : 5},
                    {text:"Waiter" , item:<Face style={{fontSize:90}}/>,count : 2},
                   {text : "Waiting" , item:<HourglassFull style={{fontSize:90}}/>,count : 4}];
    return (
      <Drawer anchor="right"variant="permanent" classes={{paper:classes.paper}}>
          <div className="Drawer">
          <List >
            <ListItem>
              <ListItemText style={{color:"black"}}><p style={{fontSize:15}}>Occupied Tables : 3<hr className="Test4"/>Free Tables : 12<hr className="Test4"/>Most Delayed Table: 10<hr className="Test4"/></p></ListItemText>
            </ListItem>
            <Divider classes={{root : classes.divider}}/>
          {items.map((text,index) => (
            <>
              <ListItem key={text} onClick={()=>this.clickhandler(items[index])} classes={{root:classes.padding}}> 
                 <ListItemIcon  style={{color:"#282c34e8"}}>
                  {items[index].item}
                </ListItemIcon>
                <ListItemText style={{color:"black"}}><p style={{fontSize:30,marginLeft:"40px"}}>{items[index].count}</p></ListItemText>
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



export default withStyles(useStyles)(RightDrawer)