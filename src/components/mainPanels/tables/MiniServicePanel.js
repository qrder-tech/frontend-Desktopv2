import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccessibilityNew, AccountBalanceWallet, CheckBox, DeleteForever, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { removeService, requestOrders } from "../../../requests/restaurant";
import { setOrders } from "../../../redux/actions";
import Loader from "react-loader-spinner";

const moment = require('moment');

class MiniServicePanel extends React.Component {
  state = {
    info: {
      serviceCount: null,
      services: [{}],
    },
    page: 0,
    rowsPerPage : 10,
    loading : true
  };

  columns = [    
    {
        id: "service",
        label: "Service",
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
        id: "actions",
        label: "Edit",
        minWidth: 20,
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

  updateServices = (services) =>{
    this.setState({loading : true});
    var temp = [];
    var serviceIcon;
    if(this.props.tableServices){
      this.props.tableServices.map((service,index)=>{     
          switch(service.name){
              case "waiter":
                  serviceIcon = <Face/>;
                  break;
              case "payment":
                  serviceIcon = <AccountBalanceWallet/>
                  break;
              default:
                  serviceIcon = <AccessibilityNew/>
                  break;

          }
          temp.push({orderNo:index+1,
              time : moment().diff(moment(service.createdAt),"minutes"),
              service : serviceIcon,
              actions : <CheckBox style={{cursor:"pointer"}} onClick={this.serve.bind(this,service.name)} />});
      });
    }
    this.setState({info:{serviceCount:temp.length,
                        services :temp}});
    this.setState({loading : false});
  }

 serve = (serviceName) =>{
  console.log(this.props.tableUuid);
  console.log(serviceName);
  removeService(this.props.token,serviceName,this.props.tableUuid).then((response)=>{
    console.log(response.data);    
    const event = new Event('table'); 
    document.dispatchEvent(event);    
    var temp = [];
    if(response.data.services){
      var serviceIcon;
      response.data.services.map((service,index)=>{     
          switch(service.name){
              case "waiter":
                  serviceIcon = <Face/>;
                  break;
              case "payment":
                  serviceIcon = <AccountBalanceWallet/>
                  break;
              default:
                  serviceIcon = <AccessibilityNew/>
                  break;

          }
          temp.push({orderNo:index+1,
              time : moment().diff(moment(service.createdAt),"minutes"),
              service : serviceIcon,
              actions : <CheckBox style={{cursor:"pointer"}} onClick={this.serve.bind(this,service.name)} />});
      });
    }
    this.setState({info:{serviceCount:temp.length,
                        services :temp}});
    
  });
 }



  componentDidMount() {
    //console.log("orderpanel : " + this.props.token);
    console.log("here");
    console.log(this.props.tableServices);
    this.updateServices();
  }

  render() {
    const {classes,rowsPerPage,page} = this.state;
    const columns = this.columns;
    const rows = this.state.info.services;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    const icons = [];
    icons["waiting"] = <HourglassFull  style={{fontSize:"40"}}/>;
    icons["served"] = <CheckBox style={{fontSize:"40"}}/>;
    //<CheckBox style={{fontSize:"40"}}/>,<AccountBalanceWallet style={{fontSize:"40"}}/>,<Face  style={{fontSize:"40"}}/>,<HourglassFull  style={{fontSize:"40"}}/>
    return ((this.state.loading)?(<Loader type="Oval" color="#837032"/>):(<div >
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
  </div>)
      
    );
  }
}

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  orders : state.orders
})

export default connect(mapStateToProps,null)(MiniServicePanel);

