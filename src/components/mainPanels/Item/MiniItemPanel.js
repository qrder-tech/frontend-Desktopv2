import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { AccountBalanceWallet, AddCircle, CheckBox, Edit, Face, HighlightOff, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { setDisplayingPanel, setMenu } from "../../../redux/actions";
import ItemDetailsPanel from "./ItemDetailsPanel";
import { removeItem, requestMenu } from "../../../requests/restaurant";

class MiniItemPanel extends React.Component {
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
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "left",
      },
    {
      id: "price",
      label: "Price",
      minWidth: 10,
      align: "center",
    }
    ,
    {
      id: "buttons",
      label: "",
      minWidth: 10,
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
        this.props.dispatch(setMenu(response.data.menu));    
      });
    });
  }



  componentDidMount() {
  }

  render() {
    const {classes,rowsPerPage,page} = this.state;
    const columns = this.columns;
    const rows = this.props.items;
    const handleChangePage = this.handleChangePage.bind(this);
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    return (
      <div >
        <TableContainer  >
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
                      <TableCell key={column.id} align={column.align} onClick={(column.id == "buttons")?(null):(null)}>
                        {(column.id == "image")?(<img alt={row.img} src={row.img} width ="50"/>):(
                        (column.id == "buttons")?(<AddCircle style={{color:"#ffda61",cursor:"pointer"}} onClick={this.props.addHandler.bind(this,row)}></AddCircle>):(<div className="OrderCell">                                                    
                          {column.format && typeof value === 'number' ? column.format(value) : (value)}
                        </div>))}
                        
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
  menu : state.menu,
  order : state.test,
  display : state.display
})

export default connect(mapStateToProps,null)(MiniItemPanel);

