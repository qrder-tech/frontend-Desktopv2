import React from "react";
const moment = require('moment');

class Table extends React.Component {

    state = {
          orderCount:null,
          orders:[{}],
          earliestOrderTime : null
       };

       componentDidMount(){
           if(this.props.tableInfo.RecentOrders.length != 0){
            var temp = {orderCount : this.props.tableInfo.RecentOrders.length,
                            orders : this.props.tableInfo.RecentOrders,
                            earliestOrderTime : -1};
                
                temp.orders.map((order)=>{
                    console.log("here");
                    
                    if(moment().diff(moment(order.createdAt),"minutes") > temp.earliestOrderTime){
                        temp.earliestOrderTime=moment().diff(moment(order.createdAt),"minutes");
                    }
                    console.log(order.createdAt);
                });
                this.setState(temp);
                
                setInterval(function(){
                    this.setState({earliestOrderTime : this.state.earliestOrderTime+1});
                }.bind(this),60000);
            }
            
       }
  render() {
    return (
      
        <div className="Table"  style={{background: (this.state.earliestOrderTime)?(getViewValues(this.state.earliestOrderTime)):("#c4a748") }}>
            <span className="TableContent">
            {this.props.tableInfo.name}
            </span>
        </div>   
    );
  }
}


export default Table;


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