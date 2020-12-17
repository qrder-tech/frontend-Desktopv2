import React from "react";
import { Button, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, withStyles } from "@material-ui/core";
import { AccountBox,AccountBalanceWallet, AddCircle, Bookmark, CheckBox,  CheckSharp,  Face, Fastfood, HighlightOff, HourglassFull, LocalOffer, Note, LocationOn, Phone, Mail, VpnKey, AccountCircle } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem, UpdateItem } from "../../requests/restaurant";
import { setDisplayingPanel } from "../../redux/actions";
import MenuPanel from "./MenuPanel";

class ProfileEditPanel extends React.Component {

    state = {
        loading : false,
        item : {},
        formVariables : [],
        img : null,
        preview:{
            name : "",
            address : "",
            phoneNumber : "",
            email : "",
            username : "",
            password : "",
            type : "",
        }
    };

    add = (formVars)=> {
            var values = [];
            formVars[1].reference = document.getElementById("types");
            values["img"]= formVars[0].reference.value;
            values["subtopicUuid"] = formVars[1].reference.value;
            values["name"]= formVars[2].reference.value;
            values["price"]= formVars[3].reference.value;
            values["desc"]= formVars[4].reference.value;
            values["metadata"]= formVars[5].reference.value;            
            //console.log(values["type"].reference);
            console.log(values);
            if(this.props.item){
                //console.log(this.state.item);
                UpdateItem(values,this.props.token,this.state.item.uuid).then((response)=>{
                    console.log(response);                    
                    this.props.dispatch(setDisplayingPanel(<MenuPanel/>));
                });
            }else{
                addItem(values,this.props.token).then((response)=>{
                    console.log(response);
                    this.props.dispatch(setDisplayingPanel(<MenuPanel/>));
                });

            }
            /**/

    }
    componentDidMount() {
        var formVariables = [
            {id:"name",label : "RestaurantName",type:"text",reference : null,default: null},
            {id:"address",label : "Address",type:"text",reference : null,default: null},
            {id:"phone",label : "PhoneNumber",type:"text",reference : null,default: null},
            {id:"email",label : "Email",type:"text",reference : null,default: null},
            {id:"username",label : "Username",type:"text",reference : null,default: null},
            {id:"password",label : "Password",type:"password",reference : null,default: null}
        ];
        
        if(this.props.item){
            console.log(this.props.item);
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

    typeRender = () =>{
        
        console.log(document.getElementById("types").value);
        var typeName = document.getElementById(document.getElementById("types").value).innerHTML;
        var temp = this.state;
        temp.preview.subtopicName = typeName;
        this.setState(temp); 
    }

    addMetadata = () =>{
        var temp = this.state;
        console.log(temp);
        temp.preview.metadata.push(document.getElementById("metadata").value);
        document.getElementById("metadata").value = "";
        this.setState(temp);
    }

    changeHandler = (contentId) =>{
        
        var temp = this.state;
        var value = document.getElementById(contentId).value;
        switch (contentId){
            case "name":
                temp.preview.name = value;
                break;
            case "address":
                temp.preview.address = value;
                break;
            case "phone":
                temp.preview.phoneNumber = value;
                break;
            case "email":
                temp.preview.email = value;
                break;
            case "username":
                temp.preview.username = value;
                break;
            case "password":
                temp.preview.password = value;
                break;
                    
        }
        this.setState(temp);
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
                                        <AccountCircle style={{fontSize:145,color:"#c4a748d0"}}/>                                        
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="GridElement">
                                    <div className="BigTag4"> 
                                        <div style={{textAlign:"left",minWidth:"100%",fontSize:"15px"}}>
                                        <Note/>{this.state.preview.name}<br/>
                                        <LocationOn/>{this.state.preview.address}<br/>
                                        <Phone/>{this.state.preview.phoneNumber}<br/>
                                        <Mail/>{this.state.preview.email}<br/>                                        
                                        <AccountBox/>{this.state.preview.username}<br/>                                        
                                        <VpnKey/>{this.state.preview.password}<br/> 
                                        <LocalOffer/>self service<span style={{color:"#000000"}}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch
                                                color="default"
                                                id = "registerSwitch"
                                                />
                                        </span>
                                        <br/>                            
                                        </div>                                
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
                                    >Update</Button>
                                    </span>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                            <div style={{textAlign:"left"}}>
                            {formVariables.map((index)=>(
                                (index.id == "type")?(<>
                                <div className="SelectLabel">Type</div> 
                                <select name="type" id="types" className="Select" onChange={this.typeRender}>
                                    {this.props.menu.map((type)=>(
                                <option id = {type.uuid} value={type.uuid} className="Option">{type.name}</option>))}
                              </select><br/>
                                <br/>
                                </>):(<>
                                    <TextField id={index.id} label = {index.label} 
                                    
                                    type={index.type}
                                    inputRef={el =>index.reference = el} 
                                    className = {classes.main}
                                    defaultValue = {index.default}
                                    onChange = {(index.id == "img") ? (this.imageRender):((index.id == "metadata")?(null):(this.changeHandler.bind(this,index.id)))}
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
                                    />   {(index.id == "metadata")?(<AddCircle style={{paddingTop:"20px"}} onClick={this.addMetadata} />):(null)}                          
                                    <br/>
                                    <br/>
                                    </>)
                                
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
  order : state.test,
  display : state.display
})

export default connect(mapStateToProps,null)(withStyles(useStyles)(ProfileEditPanel));

