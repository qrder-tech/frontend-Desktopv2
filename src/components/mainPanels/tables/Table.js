import { AccountBalanceWallet, CheckBox, Face, HourglassFull } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { setDisplayingPanel } from "../../../redux/actions";
import TableDetails from "./TableDetails";
const moment = require('moment');

class Table extends React.Component {

    state = {
          orderCount:null,
          orders:[{}],
          earliestOrderTime : null,
          notifications : []
       };

       tableDetails(table){
       //alert("hi");
       
        this.props.dispatch(setDisplayingPanel(<TableDetails table={table}/>));
        

       }

       componentDidMount(){
           if(this.props.tableInfo.status){
                var temp = {orderCount : this.props.tableInfo.Orders.length,
                            orders : this.props.tableInfo.Orders,
                            earliestOrderTime : -1,
                            notifications : []};

                if(this.props.tableInfo.services){

                    this.props.tableInfo.services.map((service)=>{
                        switch(service.name){
                            case "waiter":
                                temp.notifications.push({name:"waiter",icon:<Face className="Waiter"/>});
                                break;
                            case "payment":
                                temp.notifications.push({name:"payment",icon:<AccountBalanceWallet className="Payment"/>});
                                break;
                        }
                    });
                }
                if(this.props.tableInfo.mostDelayedDate){                    
                    temp.earliestOrderTime = moment().diff(moment(this.props.tableInfo.mostDelayedDate),"minutes");
                }else{
                    temp.earliestOrderTime = -1;
                }
                temp.notifications.push({name:"served",icon:<CheckBox className="Done"/>});
                temp.orders.map((order)=>{
                    if(order.status == "waiting"){
                        temp.notifications.pop();
                        temp.notifications.push({name:"waiting",icon:<HourglassFull className="Waiting"/>});
                    }
                });
                this.setState(temp);
            }
            
       }

  render() {
      
    return (
      
        <div className="Table"  onClick= {this.tableDetails.bind(this,this.props.tableInfo)}
        style={{cursor:"pointer" , background: (this.state.earliestOrderTime != null)?(getViewValues(this.state.earliestOrderTime)):("#c4a748") }}>
            <span className="TableContent">
            {this.props.tableInfo.name}
            
            </span>
            {this.state.notifications.map((notification)=>{return (notification.icon)})
            }
        </div>   
    );
  }
}

const mapStateToProps = state =>({
    token : state.token,
    user : state.user,
    menu : state.menu,
    order : state.test,
    display : state.display
  })

export default connect(mapStateToProps,null)(Table);


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHexFirst(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  function getViewValues(time){
      /*var firstColor = "#c4a748e8";
      var secondColor =  "#33ccffe8";
      secondColor = "#ffffffe8";
      var thirdColor =  "#282c34e8";
      thirdColor = rgbToHexFirst(255,0,0)+"40";
      var type = "radial-gradient(";*/
  
      if(time == -1){
          return "#9c9c9c";
      }
      //Base
      time = (time/45)*255;     
      const alpha = "d0";
      const firstColor = rgbToHexFirst(0,255,0)+alpha;
      const secondColor =  rgbToHexFirst(255,255,0)+alpha;
      const thirdColor =  rgbToHexFirst(255,0,0)+alpha;
      const type = "linear-gradient(150deg,";
      if(time==null){
        return "#9c9c9c";
      }    
      if(time<=63){
          return type +  firstColor + " "+ (100-(((time)*100)/63)) +"%," + secondColor + " 100%)";
      }else if(time<127){
          return type +  firstColor + " 0%," + secondColor + " "+(100-(((time-63)*100)/63))+"%)";
      }else if( time < 190){
          return type +  secondColor + " "+ (100-(((time-127)*100)/63)) +"%," + thirdColor + " 100%)";
      }else{
          return type +  secondColor + " 0%," + thirdColor + " "+(100-(((time-190)*100)/63))+"%)";
      }
  }