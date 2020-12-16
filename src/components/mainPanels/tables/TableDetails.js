import React from "react";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, AddCircle, CheckBox, Edit, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { setDisplayingPanel, setMenu } from "../../../redux/actions";
import ItemDetailsPanel from "../Item/ItemDetailsPanel";
import { addOrder, requestMenu } from "../../../requests/restaurant";
import MiniItemPanel from "../Item/MiniItemPanel";
import MiniOrderPanel from "../order/MiniOrderPanel";
import MiniServicePanel from "./MiniServicePanel";

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
    const {classes,rowsPerPage,page} = this.state;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
/**/
    return (
      <div >
          
          <Grid container spacing={1}>
              
                    <Grid item xs={12} className="GridElement">
                                    <div className="BigTag" onClick = {this.test}>
                                            {this.props.table.name}
                                        </div>
                                        
                                        
                    </Grid>
                    <Grid item xs={12} className="GridElement">
                                    todos las chicas        
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                            <Grid container spacing={1}>
                                
                                <Grid item xs={12} className="GridElement">
                                    <div className="BigMenu">
                                    <TableContainer  className="Test2">
                                      <Table stickyHeader aria-label="sticky table" >
                                        <TableBody  >
                                              <TableRow hover role="checkbox" tabIndex={-1} key={this.state.table.name} >
                                                {this.state.columns.map((column) => {
                                                  return (<>                     
                                                    <MiniOrderPanel tableOrders = {this.state.table.RecentOrders}/>
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
                    <Grid item xs={6} className="GridElement">                        
                        <Grid item xs={12} className="GridElement"><div className="BigMenu">
                                    <TableContainer  className="Test2">
                                      <Table stickyHeader aria-label="sticky table" >
                                        <TableBody  >
                                              <TableRow hover role="checkbox" tabIndex={-1} key={this.state.table.name} >
                                                {this.state.columns.map((column) => {
                                                  return (<>   
                                                        <MiniServicePanel tableServices = {this.state.table.Services}/>
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

const mapStateToProps = state =>({
  token : state.token,
  user : state.user,
  menu : state.menu,
  order : state.test,
  display : state.display
})

export default connect(mapStateToProps,null)(TableDetails);

