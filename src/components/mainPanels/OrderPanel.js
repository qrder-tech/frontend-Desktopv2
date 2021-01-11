import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, DeleteForever, Face, History, HourglassFull, NotificationsActive } from "@material-ui/icons";
import { connect } from "react-redux";
import { getUserInfo, requestOrders } from "../../requests/restaurant";
import { setDisplayingPanel, setOrders } from "../../redux/actions";
import OrderCreatePanel from "./order/OrderCreatePanel";
import { payOrder, removeOrder } from "../../requests/order";
import resClient from "../../mqtt/client";
import Loader from "react-loader-spinner";

const moment = require('moment');

class OrderPanel extends React.Component {
  state = {
    info: {
      OrderCount: null,
      orders: [{}],
    },
    serviceType : "",
    page: 0,
    rowsPerPage : 10,
    compListener : null,
    loading : true
  };

  columns = [
    {
      id: "orderNo",
      label: "Order No",
      minWidth: 170,
      align: "left",
    },
    {
      id: "time",
      label: "Time",
      minWidth: 170,
      align: "center",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 170,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 80,
      align: "right",
    },    
    {
      id: "action",
      label: "",
      minWidth: 80,
      align: "right",
    },
  ];
 
  
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };

  serveOrder = (order) =>{
    console.log(order);
    //update order as paid
    payOrder(this.props.token,order.uuid).then((response)=>{
      console.log(response);
      this.updateOrders();
    });
    //notify with mqtt
    resClient.client.publish(`restaurant/${this.props.user.uuid}/${order.uuid}`,"ready");
    /*if(order.deviceId != null){
      resClient.client.publish(`restaurant/${this.props.user.uuid}/${order.deviceId}`,"ready");
    }*/

  }

  showOrderDetails = (orderUuid,status) =>{
    console.log(orderUuid);
    
    this.props.dispatch(setDisplayingPanel(<OrderCreatePanel updateItemUuid={orderUuid} status={status}/>));
  }

  removeOrder = (uuid) =>{
    removeOrder(this.props.token,uuid).then((response)=>{
      this.updateOrders();
    });
  }

  updateOrders = () =>{    
    this.setState({loading:true});
    requestOrders(this.props.token).then((response) => {
      this.props.dispatch(setOrders(response));
      var temp = [];
      response.map((order)=>{
          temp.push({
              uuid : order.uuid,
              device : order.deviceId,
              orderNo:order.no,
              time : (order.status == "waiting")?(moment().diff(moment(order.createdAt),"minutes")):("-"),
              status : order.status ,
              price : order.totalPrice,
              action : <DeleteForever onClick={this.removeOrder.bind(this,order.uuid)} style={{cursor:"pointer"}}/>});
      })
      var service;
        getUserInfo(this.props.token).then((result)=>{
          service = result.serviceType;            
          this.setState({info:{OrderCount:response.length,
            orders : temp},
            serviceType : service});
            console.log(service == "self");
        });
      this.setState({loading:false});
      
    });
  }

  componentWillUnmount(){
    document.removeEventListener("order", this.state.compListener);
   }

  componentDidMount() {
    
    var compListener = ()=>{this.updateOrders()};
    this.setState({compListener:compListener}); 
    document.addEventListener("order",compListener);
    this.updateOrders();
  }

  render() {
    const {classes,rowsPerPage,page} = this.state;
    const columns = this.columns;
    const rows = this.state.info.orders;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    const icons = [];
    
    icons["waiting"] = <HourglassFull  style={{fontSize:"40"}}/>;
    icons["paid"] = <History style={{fontSize:"40"}}/>;
    icons["served"] = <CheckBox style={{fontSize:"40"}}/>;
    return ((this.state.loading)?(<Loader style={{position:"absolute",left:"45%",top:"45%"}}type="Oval" color="#837032"/>):(<div >
      <TableContainer  className="Test2">
      <Table stickyHeader aria-label="sticky table" >
        <TableHead >
          <TableRow >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                classes={{
                  root:"Chart-header-specs"
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody  >
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell onClick={(column.id == "action")? null :this.showOrderDetails.bind(this,row.uuid,row.status)} key={column.id} align={column.align} style={(column.id == "action")?(null):{cursor:"pointer"}} >
                      <div className="OrderCell" >                                                    
                        {column.format && typeof value === 'number' ? column.format(value) : ((column.id == "status")?((this.state.serviceType == "self" && row.status == "waiting")?(<>{icons[value]}<NotificationsActive onClick={this.serveOrder.bind(this,row)} style={{fontSize:"40"}}/></>):(icons[value])):(value))}
                
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    
      rowsPerPageOptions={[ 10]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}  
      className="Test3"      
      classes={{
        root:"Chart-header-specs"
      }}
    />
  </div>)
      
    );
  }
}

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  orders : state.orders
})

export default connect(mapStateToProps,null)(OrderPanel);

