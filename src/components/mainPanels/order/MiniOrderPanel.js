import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, DeleteForever, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { requestOrders } from "../../../requests/restaurant";
import { setOrders } from "../../../redux/actions";

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



  componentDidMount() {
    //console.log("orderpanel : " + this.props.token);
    console.log("here");
    console.log(this.props.tableOrders);
    var temp = [];
    this.props.tableOrders.map((order,index)=>{        
        temp.push({orderNo:index+1,
            time : moment().diff(moment(order.createdAt),"minutes"),
            status : (order.isPaid)?("served"):("waiting") ,
            actions : <div><CheckBox/><br/><AccountBalanceWallet/><br/><DeleteForever/></div>});
    });

    this.setState({info:{orderCount:temp.length,
                        orders :temp}});
    /*this.setState({info : getOrders()});
    setInterval(function(){      
      this.setState({info : getOrders()});
    }.bind(this),10);*/
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
                        <div className="OrderCell">                                                    
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
