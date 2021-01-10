import React from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,  TextField,  withStyles } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, Edit, Face, HighlightOff, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { addSubtopic, removeItem, requestMenu, requestOrders } from "../../requests/restaurant";
import { setDisplayingPanel, setMenu, setOrders, setUser } from "../../redux/actions";
import { setRestaurantMenu } from "../../redux/reducers";
import ItemDetailsPanel from "./Item/ItemDetailsPanel";
import ItemsPanel from "./Item/ItemsPanel";
import Loader from "react-loader-spinner";

class MenuPanel extends React.Component {
  state = {
    rows : [],
    info: {
      OrderCount: null,
      orders: [{}],
    },
    page: null,
    rowsPerPage : 10,
    loading : true
  };

  columns = [
    {
        id: "name",
        label: "Menu",
        minWidth: 170,
        align: "center",
      }
  ];

 /* columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
*/
 addType = () => {
  var value = document.getElementById("addType").value;
  addSubtopic(value,this.props.token).then((result)=>{
    requestMenu(this.props.token).then((response) => {
        this.props.dispatch(setMenu(response.data.menu));    
    });
  })
 }
  
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };

  detailsHandler = (item) => {
    console.log(item);
    this.props.dispatch(setDisplayingPanel(<ItemDetailsPanel item = {item}/>));
  }

  removeItem = (item) =>{
    /*console.log("remove");
    console.log(item);
    console.log(this.props.token);*/
    removeItem(item.uuid,this.props.token).then((response)=>{
      console.log(response);
      requestMenu(this.props.token).then((response) => {
        this.props.dispatch(setMenu(response.data));    
      });
    });
  }

  updateHandler = () =>{
    var temp = [];
    this.setState({loading:true});
    requestMenu(this.props.token).then((response) => {   
      for (const [key, value] of Object.entries(response.data.items)) {                                    //check missing arguments
        temp.push({name:key,
                  Items:value});
    }
    this.setState({rows:temp});
    this.props.dispatch(setMenu({catalog:response.data.catalog,
                                  items:temp}));
      this.setState({loading:false});
    });

    /*
    
    var temp = [];
    for (const [key, value] of Object.entries(this.props.menu.items)) {                                    //check missing arguments
      temp.push({name:key,
                Items:value});
    }
    
    this.setState({rows:temp});*/
  }



  componentDidMount() {
    //console.log("orderpanel : " + this.props.token);

    var temp = [];
      
      requestMenu(this.props.token).then((response) => {   
          for (const [key, value] of Object.entries(response.data.items)) {                                    //check missing arguments
            temp.push({name:key,
                      Items:value});
        }
        this.setState({rows:temp});
        this.props.dispatch(setMenu({catalog:response.data.catalog,
                                      items:temp}));
          this.setState({loading : false});
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
    const rows = this.state.rows;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    return ((this.state.loading)?(<Loader style={{position:"absolute",left:"45%",top:"45%"}}type="Oval" color="#837032"/>):( <div >
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
                    <ItemsPanel items = {row.Items} type={row} update={this.updateHandler}/>
                    </>
                  );
                })}
              </TableRow>
            </>);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </div>)
     
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

export default connect(mapStateToProps,null)(withStyles(useStyles)(MenuPanel));

