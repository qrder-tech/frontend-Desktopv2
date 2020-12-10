import React from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, withStyles } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem, requestMenu, requestOrders } from "../../requests/restaurant";
import { setMenu, setOrders, setUser } from "../../redux/actions";
import { setRestaurantMenu } from "../../redux/reducers";

class ItemPanel extends React.Component {

    state = {
        loading : false
    };

    add = (formVars)=> {
            var values = [];
            values["img"]= formVars[0].reference.value;
            values["name"]= formVars[1].reference.value;
            values["price"]= formVars[2].reference.value;
            values["desc"]= formVars[3].reference.value;
            values["metadata"]= formVars[4].reference.value;
            addItem(values,this.props.token).then((response)=>{
                console.log(response);
            });

    }
    componentDidMount() {

    }

    render() {
        const {classes} = this.props;
        
        var formVariables = [
            {id:"img",label : "Image(URL)",type:"text",reference : null},
            {id:"name",label : "Name",type:"text",reference : null},
            {id:"price",label : "Price",type:"text",reference : null},
            {id:"desc",label : "Description",type:"text",reference : null},
            {id:"metadata",label : "Optionals",type:"text",reference : null}]
        return (
            <>
            
            {formVariables.map((index)=>(
                    <>
                    <TextField id={index.id} label = {index.label} 
                    type={index.type}
                    inputRef={el =>index.reference = el} 
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
                    <br/>
                    <br/>
                    </>
                ))}
                <span className="ButtonLayout">
                <Button
                    classes={{
                        root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                        label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={this.add.bind(this,formVariables)}
                >Add</Button>
                </span>
                </>
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
  order : state.test
})

export default connect(mapStateToProps,null)(withStyles(useStyles)(ItemPanel));

