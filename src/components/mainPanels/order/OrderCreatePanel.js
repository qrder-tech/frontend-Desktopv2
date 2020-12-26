import React from "react";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, withStyles } from "@material-ui/core";
import { AccountBalanceWallet, AddCircle, CheckBox, Edit, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { setDisplayingPanel, setMenu } from "../../../redux/actions";
import ItemDetailsPanel from "../Item/ItemDetailsPanel";
import { addOrder, requestMenu } from "../../../requests/restaurant";
import MiniItemPanel from "../Item/MiniItemPanel";

class OrderCreatePanel extends React.Component {
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
        label: "Menu",
        minWidth: 200,
        align: "Center",
      }
  ];
 
  
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };

 /* addItemToOrderHandler = (item) => {
    var items = this.state.order.items;
    items.push(item);   
    var order = {items : items,
                totalPrice : this.state.order.totalPrice + item.price};
    this.setState({order : order});
  }*/

  addItemToOrderHandler = (item) => {
    var items = this.state.order.items;
    if(items.find(element => element.uuid == item.uuid)){
      items.find(element => element.uuid == item.uuid).quantity++;      
      items.find(element => element.uuid == item.uuid).price +=item.price;
      if(items.find(element => element.uuid == item.uuid).quantity < 3){
        items.find(element => element.uuid == item.uuid).name +="x2";
      }else{                
        var tempString = items.find(element => element.uuid == item.uuid).name.substr(0,items.find(element => element.uuid == item.uuid).name.length-1);
        items.find(element => element.uuid == item.uuid).name= tempString;
        items.find(element => element.uuid == item.uuid).name += items.find(element => element.uuid == item.uuid).quantity;
      }
    }else{      
      var tempItem = {name:item.name,price : item.price,uuid : item.uuid,metadata:item.metadata,quantity:1};
      items.push(tempItem);  
    } 
    var order = {items : items,
                totalPrice : this.state.order.totalPrice + item.price};
    this.setState({order : order});
  }

  test = () =>{
    /*console.log(this.state.order);
    console.log(this.props.user.uuid);*/
    var requestOrder = {
      restaurantUuid : this.props.user.uuid,
      userUuid : null,
      items : []
    }
    this.state.order.items.map((item)=>{
      requestOrder.items.push({uuid:item.uuid,metadata:item.metadata,quantity:item.quantity});
    });
    addOrder(this.props.token,requestOrder);
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
    const {classes} = this.props;
    const {rowsPerPage,page} = this.state;
    const columns = this.columns;
    const rows = this.props.menu;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
/**/
    return (
          
          <Grid container spacing={1}>
                    <Grid item xs={6} className="GridElement">
                            <Grid container spacing={1}>
                                
                                <Grid item xs={12} className="GridElement">
                                <div className="BigTag" onClick = {this.test}>
                                        Order
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="GridElement" style={{maxHeight:"390px"}}>
                                    <TableContainer  className="BigMenu2">
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
                                            return (<>
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                                
                                                    <TableCell align="center" classes={{
                                                        root:"Chart-header-specs3"
                                                      }} >
                                                        {row.name}
                                                    </TableCell>
                                                    
                                              </TableRow>
                                              <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                                {columns.map((column) => {
                                                  const value = row[column.id];
                                                  return (<>                     
                                                    <MiniItemPanel items = {row.Items} addHandler = {this.addItemToOrderHandler}/>
                                                    </>
                                                  );
                                                })}
                                              </TableRow>
                                            </>);
                                          })}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                      <Grid container spacing={1}>
                        <Grid item xs={12} className="GridElement">
                          <div className="BigTag2">
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
                                           
                          <Grid item xs={12} className="GridElement">                            
                            
                              {this.props.user == null ? (null):(this.props.user.serviceType == "normal" ? (<div className="BigTag3"><select name="tables" id="types" className="Select2">
                                      {this.props.tables.map((table)=>(
                                  <option value={table.uuid} className="Option">{table.name}</option>))}
                                </select><br/></div>):(null))}
                              
                          </Grid>
                          <Grid item xs={12} className="GridElement">                            
                              <Button
                                            classes={{
                                                root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                                label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                            }}
                                        >Done</Button>&nbsp;
                                        <Button
                                        classes={{
                                            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                        }}
                                    >Remove</Button>
                              </Grid>
                        </Grid>                           
                    </Grid>
                </Grid>
       
    );
  }
}

const useStyles = {
  main:{
      '& label.Mui-focused': {
          color: '#c4a748d0',
        },          
  '& .MuiInput-underline:after': {
      borderBottomColor: '#c4a748d0',
    },
  },
  font:{
      color : "#c4a748d0",
      '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
  },
  buttonRoot: {
      background: 'linear-gradient(45deg, #c4a748d0 30%, #c4a748d0 90%)',
      borderRadius: 3,
      border: 0,
      color: 'black',
      height: 48,
      padding: '0 30px',
    },
  buttonLabel: {
      textTransform: 'capitalize',
  },
}

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  menu : state.menu,
  order : state.test,
  tables : state.tables,
  display : state.display
});


export default connect(mapStateToProps,null)(withStyles(useStyles)(OrderCreatePanel));

