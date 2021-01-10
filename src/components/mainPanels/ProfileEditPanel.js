import React from "react";
import { Button, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, withStyles } from "@material-ui/core";
import { AccountBox,AccountBalanceWallet, AddCircle, Bookmark, CheckBox,  CheckSharp,  Face, Fastfood, HighlightOff, HourglassFull, LocalOffer, Note, LocationOn, Phone, Mail, VpnKey, AccountCircle } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem, editProfile, getUserInfo, UpdateItem } from "../../requests/restaurant";
import { setDisplayingPanel, setDisplayValue, setUser } from "../../redux/actions";
import MenuPanel from "./MenuPanel";
import TablePanel from "./tables/TablePanel";
import OrderPanel from "./OrderPanel";

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
        },
        changes : []
    };

    editUser = (formVars)=> {
            
        
        var values = {};
        console.log(formVars);
            formVars.map((element)=>{
                if(this.state.changes.indexOf(element.id) != -1){
                    values[element.id] = element.reference.value;
                }
            });
            editProfile(this.props.token,values).then(()=>{
                getUserInfo(this.props.token).then((result)=>{
                    this.props.dispatch(setUser(result));  
                    const event1 = new CustomEvent("tab",{detail:"0"});
                    document.dispatchEvent(event1);                 
                    this.props.dispatch(setDisplayingPanel(<OrderPanel/>));
                    const event = new Event('user'); 
                    document.dispatchEvent(event);
                })
            });

    }
    handleTypeSwitch = () =>{
        var prev = this.state.preview;
        if(prev.serviceType == "normal"){
            prev.serviceType ="self";
        }else{
            prev.serviceType = "normal";
        }
        this.setState({preview:prev});
    }

    updateView = () =>{
        var formVariables = [];
        if(this.props.user){
            this.setState({preview:this.props.user,img : this.props.user.img});
            formVariables = [            
                {id:"img",label : "image",type:"text",reference : null,default1: this.props.user.img},
                {id:"name",label : "Restaurant Name",type:"text",reference : null,default1: this.props.user.name},
                {id:"address",label : "Address",type:"text",reference : null,default1: this.props.user.address},
                {id:"phoneNumber",label : "Phone Number",type:"text",reference : null,default1: this.props.user.phoneNumber},
                {id:"email",label : "Email",type:"text",reference : null,default1: this.props.user.email},
                {id:"username",label : "Username",type:"text",reference : null,default1: this.props.user.username},
                {id:"password",label : "Password",type:"password",reference : null,default1: this.props.user.password}
            ];
        }else{
            getUserInfo(this.props.token).then((result)=>{
                this.props.dispatch(setUser(result));
                this.setState({preview: result,img: result.img});
                formVariables = [            
                    {id:"img",label : "image",type:"text",reference : null,default1: result.img},
                    {id:"name",label : "Restaurant Name",type:"text",reference : null,default1: result.name},
                    {id:"address",label : "Address",type:"text",reference : null,default1: result.address},
                    {id:"phoneNumber",label : "Phone Number",type:"text",reference : null,default1: result.phoneNumber},
                    {id:"email",label : "Email",type:"text",reference : null,default1: result.email},
                    {id:"username",label : "Username",type:"text",reference : null,default1: result.username},
                    {id:"password",label : "Password",type:"password",reference : null,default1: result.password}
                ];
            });
        }
        
        if(this.props.item){
            console.log(this.props.item);
            this.setState({item : this.props.item})
            formVariables.map((index)=>{index.default = this.props.item[index.id]});
            this.setState({img:this.props.item.img})
        }
        this.setState({formVariables});
    }
    componentDidMount() {
        this.updateView();
    }

    imageRender = () =>{
        var temp = this.state;
        if(temp.changes.indexOf("img") == -1){
            temp.changes.push("img");
        }
        temp.img = this.state.formVariables[0].reference.value;
        this.setState(temp);
        /*
        console.log(this.state.formVariables[0].reference.value);
        this.setState({img:this.state.formVariables[0].reference.value});*/
    }


    changeHandler = (contentId) =>{
        
        var temp = this.state;
        var value = document.getElementById(contentId).value;
       /* if(temp.changes.indexOf(contentId) == -1){
            
            temp.changes.push(contentId);
        }*/
        if(contentId != "password"){
            if(temp.changes.indexOf(contentId) == -1){
                
                temp.changes.push(contentId);
            }
        }
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
//        console.log(this.state.formVariables);

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
                                        {(this.state.img)?
                                        ( <img  src={this.state.img} width ="60%" height ="100%"/> ):
                                        (<AccountCircle style={{fontSize:145,color:"#c4a748d0"}}/> )}
                                                                               
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
                                        <LocalOffer/>{this.state.preview.serviceType}<span style={{color:"#000000",float:"right"}}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch
                                                color="default"
                                                id = "registerSwitch"
                                                onChange={this.handleTypeSwitch}
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
                                        onClick={this.editUser.bind(this,formVariables)}
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
                                    defaultValue = {index.default1}
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

