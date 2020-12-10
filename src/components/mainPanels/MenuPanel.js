import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { requestMenu, requestOrders } from "../../requests/restaurant";
import { setMenu, setOrders, setUser } from "../../redux/actions";
import { setRestaurantMenu } from "../../redux/reducers";

class MenuPanel extends React.Component {
  state = {
    info: {
      OrderCount: null,
      orders: [{}],
    },
    page: null,
    rowsPerPage : 10,
  };

  columns = [
    
    {
      id: "image",
      label: "Image",
      minWidth: 170,
      align: "left"
    },
    {
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "left",
      },
    {
      id: "price",
      label: "Price",
      minWidth: 170,
      align: "center",
    },
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
 
  
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:+event.target.value});
    this.setState({page:0});
  };



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
    const icons = [<CheckBox style={{fontSize:"40"}}/>,<AccountBalanceWallet style={{fontSize:"40"}}/>,<Face  style={{fontSize:"40"}}/>,<HourglassFull  style={{fontSize:"40"}}/>];
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {(column.id == "image")?(<img alt={row.img} src={row.img} width ="50"/>):(<div className="OrderCell">                                                    
                          {column.format && typeof value === 'number' ? column.format(value) : ((column.id == "status")?(icons[value-1]):(value))}
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
  menu : state.menu,
  order : state.test
})

export default connect(mapStateToProps,null)(MenuPanel);

