import React from "react";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, withStyles } from "@material-ui/core";
import { AccountBalanceWallet, CheckBox,  Face, HourglassFull } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem, requestMenu, requestOrders, UpdateItem } from "../../../requests/restaurant";

class ItemPanel extends React.Component {

    state = {
        loading : false,
        item : {},
        formVariables : [],
        img : null
    };

    add = (formVars)=> {
        console.log(this.state.img);
            var values = [];
            values["img"]= formVars[0].reference.value;
            values["name"]= formVars[1].reference.value;
            values["price"]= formVars[2].reference.value;
            values["desc"]= formVars[3].reference.value;
            values["metadata"]= formVars[4].reference.value;
            if(this.props.item){
                //console.log(this.state.item);
                UpdateItem(values,this.props.token,this.state.item.uuid).then((response)=>{
                    console.log(response);
                });
            }else{
                addItem(values,this.props.token).then((response)=>{
                    console.log(response);
                });
            }
            /**/

    }
    componentDidMount() {
        var formVariables = [
            {id:"img",label : "Image(URL)",type:"text",reference : null,default: null},
            {id:"name",label : "Name",type:"text",reference : null,default: null},
            {id:"price",label : "Price",type:"text",reference : null,default: null},
            {id:"desc",label : "Description",type:"text",reference : null,default: null},
            {id:"metadata",label : "Optionals",type:"text",reference : null,default: null
        }];
        
        if(this.props.item){
            this.setState({item : this.props.item})
            formVariables.map((index)=>{index.default = this.props.item[index.id]});
            this.setState({img:this.props.item.img})
        }
        this.setState({formVariables});
    }

    imageRender = () =>{
        console.log(this.state.formVariables[0].reference.value);
        this.setState({img:this.state.formVariables[0].reference.value});
    }

    render() {
        const {classes} = this.props;
        console.log(this.state.formVariables);

        var formVariables = this.state.formVariables;

            formVariables.map((index)=>{index.default = this.state.item[index.id]});
            var test = "test";
        return (
            <>
            <Grid container spacing={1}>
                    <Grid item xs={6} className="GridElement">
                            <Grid container spacing={1}>
                                
                                <Grid item xs={12} className="GridElement">
                                    <div className="BigImage">
                                        <img  src={this.state.img} width ="60%" height ="100%"/>                                        
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="GridElement">                                   
                                    <span className="ButtonLayout">
                                    <Button
                                        classes={{
                                            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                        }}
                                        onClick={this.add.bind(this,formVariables)}
                                    >{(this.props.item) ? (<>Update</>):(<>Add</>)}</Button>
                                    </span>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                            <div style={{textAlign:"left"}}>
                            {formVariables.map((index)=>(
                                <>
                                <TextField id={index.id} label = {index.label} 
                                type={index.type}
                                inputRef={el =>index.reference = el} 
                                className = {classes.main}
                                defaultValue = {index.default}
                                onChange = {(index.id == "img") ? (this.imageRender):(null)}
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
                            </div>                      
                    </Grid>
                </Grid>
           
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

