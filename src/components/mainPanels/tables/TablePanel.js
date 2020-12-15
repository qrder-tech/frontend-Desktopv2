import React from "react";
import Grid from "@material-ui/core/Grid";
import Table from "./Table"
import { getTablesRequest } from "../../../requests/restaurant";
import { connect } from "react-redux";
import { setTables } from "../../../redux/actions";

class TablePanel extends React.Component {
  
  state = {
    info:{
      tableCount:null,
      tables:[{}]
    },
    columns :[]
   };

  componentDidMount(){
      if(this.props.tables.table){
        var rows = [];
        const columns = [];
        for (var i = 0; i < this.props.tables.table.length; i++) {
        rows.push(
            <Grid item xs={2} className="GridElement">
            <Table tableInfo={this.props.tables.table[i]}/>
            </Grid>
        );
        }
            columns.push(
            <Grid container item xs={12} spacing={5}>
                {rows}
            </Grid>
        );
        this.setState({columns});
      }else{
        getTablesRequest(this.props.token).then((response)=>{
            this.props.dispatch(setTables(response.data.table));
            var rows = [];
            const columns = [];
            for (var i = 0; i < response.data.table.length; i++) {
            rows.push(
                <Grid item xs={2} className="GridElement">
                <Table tableInfo={response.data.table[i]}/>
                </Grid>
            );
            }
                columns.push(
                <Grid container item xs={12} spacing={5}>
                    {rows}
                </Grid>
            );
            this.setState({columns});
          });
      }
       
        
    
  }

  render() {
    
    
      
    return (
      <div className="TablePanel">
        <Grid container spacing={1}>
          {this.state.columns}
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
    display : state.display,
    tables : state.tables
  })
  

export default  connect(mapStateToProps,null)(TablePanel);