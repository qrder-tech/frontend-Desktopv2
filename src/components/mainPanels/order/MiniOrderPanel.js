import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, DeleteForever, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { requestOrders } from "../../../requests/restaurant";
import { setDisplayingPanel, setOrders } from "../../../redux/actions";
import { getSpecificOrder, payOrder, removeOrder, serveOrder } from "../../../requests/order";
import OrderCreatePanel from "./OrderCreatePanel";

const moment = require('moment');

class MiniOrderPanel extends React.Component {
  state = {
    info: {
      OrderCount: null,
      orders: [{}],
    },
    page: 0,
    rowsPerPage : 10,
  };

  columns = [
    {
      id: "orderNo",
      label: "Order No",
      minWidth: 30,
      align: "left",
    },
    {
      id: "time",
      label: "Time",
      minWidth: 30,
      align: "center",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 30,
      align: "right",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 30,
      align: "right",
    },    
    {
        id: "actions",
        label: "Edit",
        minWidth: 30,
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

  removeOrder= (uuid) =>{
    //console.log(this.state.info.orders);
    removeOrder(this.props.token,uuid).then((response)=>{
      this.updateOrders();
    });
  }

  serveOrder = (uuid) => {
    serveOrder(this.props.token,uuid).then((response)=>{
      console.log(response);
      this.updateOrders();
    })
  }

  payOrder = (uuid) =>{
    payOrder(this.props.token,uuid).then((response)=>{
      console.log(response);
      this.updateOrders();
    })
  }

  updateOrders = () =>{
    var temp = [];

    this.setState({info:{orderCount:0,
              orders : temp}});
    this.props.tableOrders.map((order)=>{
         getSpecificOrder(this.props.token,order.uuid).then((result)=>{
            console.log(result);
            temp.push({
              uuid : order.uuid,
              orderNo:result.no,
              time : moment().diff(moment(result.createdAt),"minutes"),
              status : result.status ,
              price : result.totalPrice,
              actions : <div>{(result.status == "waiting")?(<CheckBox onClick={this.serveOrder.bind(this,order.uuid)}/>):(<AccountBalanceWallet onClick={this.payOrder.bind(this,order.uuid)}/>) }<br/><DeleteForever onClick={this.removeOrder.bind(this,order.uuid)}/></div>});
              
            this.setState({info:{orderCount:temp.length,
              orders :temp}});
            
         }).catch((error)=>{
         });
    });
    
  }

  orderDetails = (orderUuid) =>{
    this.props.dispatch(setDisplayingPanel(<OrderCreatePanel tableUuid={this.props.tableUuid} updateItemUuid={orderUuid}/>))
  }

  componentDidMount() {
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
    icons["served"] = <CheckBox style={{fontSize:"40"}}/>;
    //<CheckBox style={{fontSize:"40"}}/>,<AccountBalanceWallet style={{fontSize:"40"}}/>,<Face  style={{fontSize:"40"}}/>,<HourglassFull  style={{fontSize:"40"}}/>
    return (
      <div >
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
                      <TableCell key={column.id} align={column.align} >
                        <div className="OrderCell" onClick={(column.id =="actions")?(null):(this.orderDetails.bind(this,row.uuid))}>                                                    
                          {column.format && typeof value === 'number' ? column.format(value) : ((column.id == "status")?(icons[value]):(value))}
                          
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
    </div>
    );
  }
}

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  orders : state.orders
})

export default connect(mapStateToProps,null)(MiniOrderPanel);

