import React from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, withStyles } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox, Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem, requestMenu, requestOrders } from "../../requests/restaurant";
import { setMenu, setOrders, setUser } from "../../redux/actions";
import { setRestaurantMenu } from "../../redux/reducers";

class ItemPanel extends React.Component {


    add = ()=> {
            var values = [];
            values["img"]= this.img.value;
            values["name"]= this.name.value;
            values["price"]= this.price.value;
            values["desc"]= this.desc.value;
            values["metadata"]= this.metadata.value;
            
            addItem(values,this.props.token).then((response)=>{
                console.log(response);
            });

    }
    componentDidMount() {

    }

    render() {
        const {classes} = this.props;
        
        const formVariables = [
            {id:"img",label : "Image(URL)",type:"text"},
            {id:"name",label : "Name",type:"text"},
            {id:"price",label : "Price",type:"text"},
            {id:"desc",label : "Description",type:"text"},
            {id:"metadata",label : "Optionals",type:"text"}]
        return (
            <>
            {formVariables.map((index)=>(
                    <>
                    <TextField id={index.id} label = {index.label} 
                    type={index.type}
                    inputRef={el =>eval("this." + index.id + "= el")} 
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
                    onClick={this.add}
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

