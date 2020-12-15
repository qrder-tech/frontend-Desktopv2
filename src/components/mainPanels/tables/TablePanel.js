import React from "react";
import Grid from "@material-ui/core/Grid";
import Table from "./Table"
import { createTable, getTablesRequest } from "../../../requests/restaurant";
import { connect } from "react-redux";
import { setTables } from "../../../redux/actions";
import { Button, TextField, withStyles } from "@material-ui/core";

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

  add = () =>{
    //alert(document.getElementById("tableAddTextField").value);
    createTable(document.getElementById("tableAddTextField").value,this.props.token).then(()=>{
      this.componentDidMount();
    });
  }

  render() {
    const {classes} = this.props;
    
      
    return (
      <div className="TablePanel">
        
        <span style={{float:"center"}}>
        <TextField id="tableAddTextField" label = "TableName"                                     
                                    type="text"                                     
                                    className = {classes.main}  
                                    InputProps={{
                                            classes:{
                                                input:classes.font
                                            }
                                        }}
                                        InputLabelProps={{
                                            classes:{
                                                root: classes.font,
                                            }
                                        }}
                                    />
                                    <Button                                    
                                    classes={{
                                      root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                      label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                  }}
                                  onClick={this.add.bind(this)}
                                    >Add</Button>
          </span>
          <hr/>
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
  

export default  connect(mapStateToProps,null)(withStyles(useStyles)(TablePanel));