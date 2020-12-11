import React from "react";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, AddCircle, CheckBox, Edit, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { setDisplayingPanel, setMenu } from "../../../redux/actions";
import ItemDetailsPanel from "../Item/ItemDetailsPanel";
import { requestMenu } from "../../../requests/restaurant";

class OrderPanel extends React.Component {
  state = {
    order : {
        items : [],
        totalPrice : 0,
    },
    page: null,
    rowsPerPage : 10,
  };

  columns = [
    
    {
        id: "name",
        label: "Name",
        minWidth: 200,
        align: "left",
      },
    {
      id: "price",
      label: "Price",
      minWidth: 10,
      align: "center",
    },
    {
      id: "add",
      label: "",
      minWidth: 10,
      align: "center",
    }
  ];
 
  
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };

  addItemToOrderHandler = (item) => {
    var items = this.state.order.items;
    items.push(item);   
    var order = {items : items,
                totalPrice : this.state.order.totalPrice + item.price};
    this.setState({order : order});
    //this.setState()
    //this.props.dispatch(setDisplayingPanel(<ItemDetailsPanel item = {item}/>));
  }



  componentDidMount() {
    //console.log("orderpanel : " + this.props.token);

    
        
      requestMenu(this.props.token).then((response) => {
          this.props.dispatch(setMenu(response.data.menu));    
      });
      
    
    /*this.setState({info : getOrders()});
    setInterval(function(){      
      this.setState({info : getOrders()});
    }.bind(this),10);*/
  }

  render() {
    const {classes,rowsPerPage,page} = this.state;
    const columns = this.columns;
    const rows = this.props.menu;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
/**/
    return (
      <div >
          
          <Grid container spacing={1}>
                    <Grid item xs={6} className="GridElement">
                            <Grid container spacing={1}>
                                
                                <Grid item xs={12} className="GridElement">
                                <div className="BigTag">
                                        Order
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="GridElement">
                                    <div className="BigMenu">
                                        <TableContainer  className="TableContainer">
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
                                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                    <TableCell key={column.id} align={column.align} style={{cursor:"pointer"}}>
                                                        {(column.id == "add")?(<AddCircle style={{color:"#ffda61"}} onClick={this.addItemToOrderHandler.bind(this,row)} />):(<div className="OrderCell">                                                    
                                                        {column.format && typeof value === 'number' ? column.format(value) : (value)}
                                                        </div>)}
                                                        
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
                                </Grid>
                                <Grid item xs={12} className="GridElement">
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
                                    root:"Chart-header-specs2"
                                    }}
                                />
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                        <div className="BigTag">
                            <div style={{textAlign:"left"}}>
                                {this.state.order.items.map((item) =>(
                                <>{item.name}
                                    <span style={{float:"right"}}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{item.price}
                                    </span><br/></>))}
                                <hr/>
                                <div style={{textAlign:"right"}}>
                                   Price :  {this.state.order.totalPrice}
                                </div>
                            </div>
                        </div>                            
                    </Grid>
                </Grid>
       
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

export default connect(mapStateToProps,null)(OrderPanel);

