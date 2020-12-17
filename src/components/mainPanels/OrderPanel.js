import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, Face, HourglassFull, NotificationsActive } from "@material-ui/icons";
import { connect } from "react-redux";
import { requestOrders } from "../../requests/restaurant";
import { setOrders } from "../../redux/actions";

const moment = require('moment');

class OrderPanel extends React.Component {
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
      id: "status",
      label: "Status",
      minWidth: 170,
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
    if(this.props.orders){
      var temp = [];
        this.props.orders.map((order,index)=>{
            temp.push({orderNo:index+1,
                time : moment().diff(moment(order.createdAt),"minutes"),
                status : "waiting" });
        })
        this.setState({info:{OrderCount:this.props.orders.length,
                      orders : temp}});
    }
    else{
      requestOrders(this.props.token).then((response) => {
        
        this.props.dispatch(setOrders(response.orders));
        var temp = [];
        response.orders.map((order,index)=>{
            temp.push({orderNo:index+1,
                time : moment().diff(moment(order.createdAt),"minutes"),
                status : (order.isPaid)?("served"):("waiting") });
        })
        temp.sort(function(a,b){return b.time-a.time});
        this.setState({info:{OrderCount:response.orders.length,
                      orders : temp}});
      });
    }
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
    if(this.props.user != null){
      if(this.props.user.restaurantType != "normal"){        
        icons["waiting"] = <><HourglassFull  style={{fontSize:"40"}}/><NotificationsActive style={{fontSize:"40"}}/></>;
      }
    }
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
    </div>
    );
  }
}

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  orders : state.orders
})

export default connect(mapStateToProps,null)(OrderPanel);

