import React from "react";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, withStyles } from "@material-ui/core";
import { AccountBalanceWallet, AddCircle, CheckBox, Edit, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { setDisplayingPanel, setDisplayValue, setMenu } from "../../../redux/actions";
import ItemDetailsPanel from "../Item/ItemDetailsPanel";
import { addService, removeService, removeTable, requestMenu } from "../../../requests/restaurant";
import MiniItemPanel from "../Item/MiniItemPanel";
import MiniOrderPanel from "../order/MiniOrderPanel";
import MiniServicePanel from "./MiniServicePanel";
import OrderCreatePanel from "../order/OrderCreatePanel";
import TablePanel from "./TablePanel";

var QRCode = require('qrcode.react');

class TableDetails extends React.Component {
  state = {
      table:{},
    order : {
        items : [],
        totalPrice : 0,
    },
    page: null,
    rowsPerPage : 10,
    columns : []
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
    console.log(this.props.table.uuid);
    /*removeService(this.props.token,"waiter",this.props.table.uuid).then((response)=>{
      console.log(response);
    });*/
  }



   
  downloadQR = () =>{
    const canvas = document.getElementById(`qr${this.props.table.uuid}`);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  removeTable = () =>{
    removeTable(this.props.token,this.props.table.uuid).then(()=>{      
      const event = new Event('table'); 
      document.dispatchEvent(event);      
      const event1 = new CustomEvent("tab",{detail:"1"});
      document.dispatchEvent(event1);                     
      this.props.dispatch(setDisplayingPanel(<TablePanel/>));
    });

  }


  componentDidMount() {
    //console.log("orderpanel : " + this.props.token);

    console.log("here");
        console.log(this.props.table);
        this.setState({table:this.props.table});
      
    this.setState({columns:this.columns});
    
    /*this.setState({info : getOrders()});
    setInterval(function(){      
      this.setState({info : getOrders()});
    }.bind(this),10);*/
  }

  render() {
    const {classes} = this.props;
    const {rowsPerPage,page} = this.state;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
/**/
    return (
      <div >
          
          <Grid container spacing={1}>
              
                    <Grid item xs={4} className="GridElement">
                                    <div className="BigTag" onClick = {this.test}>                                                                                     
                                            <QRCode id={`qr${this.props.table.uuid}`} value={`${this.props.user.uuid}:${this.props.table.uuid}`} bgColor="#837032" fgColor="#282c34e8"/>
                                        </div>
                    </Grid>
                    <Grid item xs={8} className="GridElement">
                         <Grid container spacing={1}>
                          <Grid item xs={12} className="GridElement">
                                      <div className="BigTag" onClick = {this.test}>
                                              {this.props.table.name} 
                                          </div>  
                            </Grid>           
                          <Grid item xs={12} className="GridElement">
                                                  <a style={{cursor:"pointer"}}onClick={this.downloadQR}>Download QR</a>
                          </Grid>                            
                        </Grid>           
                    </Grid>             
                                        
                    <Grid item xs={9} className="GridElement" >
                            <Grid container spacing={1}>
                                
                                <Grid item xs={12} className="GridElement"style={{maxHeight:"300px"}} >
                                    <div className="BigMenu">
                                      <br/>
                                    <Button
                                        classes={{
                                            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                        }}
                                        onClick={()=>{this.props.dispatch(setDisplayingPanel(<OrderCreatePanel tableUuid={this.props.table.uuid}/>));}}
                                          >Add Order</Button>
                                          <br/>
                                          <br/>
                                    <TableContainer  className="BigMenu2">
                                      <Table stickyHeader aria-label="sticky table" >
                                        <TableBody  >
                                              <TableRow hover role="checkbox" tabIndex={-1} key={this.state.table.name} >
                                                {this.state.columns.map((column) => {
                                                  return (<>                     
                                                    <MiniOrderPanel tableOrders = {this.state.table.Orders} tableUuid={this.props.table.uuid}/>
                                                    </>
                                                  );
                                                })}
                                              </TableRow>
                                          
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                    </div>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={3} className="GridElement">                        
                        <Grid item xs={12} className="GridElement" style={{maxHeight:"300px"}} >
                          <div className="BigMenu">
                        <br/>
                          <Button
                                        classes={{
                                            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                        }}
                                        onClick={this.removeTable}
                                          >Remove Table</Button>
                                          <br/>
                                          <br/>
                                    <TableContainer  className="BigMenu2">
                                      <Table stickyHeader aria-label="sticky table" >
                                        <TableBody  >
                                              <TableRow hover role="checkbox" tabIndex={-1} key={this.state.table.name} >
                                                {this.state.columns.map((column) => {
                                                  return (<>   
                                                        <MiniServicePanel tableUuid={this.state.table.uuid} tableServices = {this.state.table.services}/>
                                                    </>
                                                  );
                                                })}
                                              </TableRow>
                                            
                                          
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                    </div>
                        </Grid>                         
                    </Grid>
                </Grid>
       
    </div>
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
  display : state.display
})

export default connect(mapStateToProps,null)(withStyles(useStyles)(TableDetails));

