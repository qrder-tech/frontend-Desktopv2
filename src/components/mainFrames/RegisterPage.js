import { Button, Switch, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, registration } from '../../requests/auth';
import { setToken, setUser} from '../../redux/actions'
import { getUserInfo } from '../../requests/restaurant';
import { AccountBox, LocationOn, Mail, Note, Phone, VpnKey } from '@material-ui/icons';



class RegisterPage extends React.Component{
    
    state = {
        loading : false,
        type : "normal"
        
    };


    typeChange= () => {                                                                         //service Type switch

        var s = document.getElementById("registerSwitch").checked;
        this.setState({type:(s)?("self"):("normal")})
    }

    register = (formVars) => {
        const { history } = this.props;
        this.setState({loading : true});                                                        //set loading notifier to panel
        var values = [];
        
        //put values into DTO form
        values["name"]= formVars[0].id.value;                                                   //DTO object : values[]
        values["address"]= formVars[1].id.value;
        values["phoneNumber"]= formVars[2].id.value;
        values["service"] = this.state.type;
        values["email"]= formVars[3].id.value;
        values["username"]= formVars[4].id.value;
        values["password"]= formVars[5].id.value;


        for (const [key, value] of Object.entries(values)) {                                    //check missing arguments
            if(!value){                        
                this.setState({loading : false});
                alert("missing " + key);        
                return;
            }            
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!pattern.test(values["email"])){
            this.setState({loading : false});                                                   //email struct validation
            alert("email is not valid");        
            return;
        }

        registration(values).then((response)=>{                                                 //registration request

            if(response.status == 200){                                                         //response status code :200

                login(values["username"],values["password"]).then((response)=>{                 //login request
                    
                    if(response){                                                               //if response is served

                        this.props.dispatch(setToken(response.token));                          //set token from response to redux
                        
                        getUserInfo(this.props.token).then((result)=>{                          //user details request
                            
                            this.props.dispatch(setUser(result));                               //set user details from response to redux
                            
                            history.push("/mainPage");                                          //push main page to be redirected
                        
                        });
                    } else{
                        alert("unable to login");                                               //communication error
                    }
                               
                }).catch((error)=>{
                    console.log("error is : " + error );
                });
            }else{                                                                              //error response
                //todo
            }      
        });
        this.setState({loading : false});        
    }

    login =() =>{
        
        const { history } = this.props;
        history.push("/login");
    }

    render(){
        const {classes } = this.props;

        const {loading} = this.state;
        
        //form variables that holds input's type, label, id, reference and specified icon
        var formVariables = [
            {name:"name", id:null,label : "Name",type:"text",icon:<Note  style={{fontSize:"50px",color:"black"}}/>},
            {name : "address",id:null,label : "Address",type:"text",icon:<LocationOn style={{fontSize:"50px",color:"black"}}/>},
            {name : "phoneNumber",id:null,label : "Phone Number",type:"tel",icon:<Phone style={{fontSize:"50px",color:"black"}}/>},
            {name : "email",id:null,label : "Email",type:"email",icon:<Mail style={{fontSize:"50px",color:"black"}}/>},
            {name : "username",id:null,label : "Username",type:"text",icon:<AccountBox style={{fontSize:"50px",color:"black"}}/>},
            {name : "password",id:null,label : "Password",type:"password",icon:<VpnKey style={{fontSize:"50px",color:"black"}}/>}];
         
        
        return(
        <div className="App">
          <header className="App-Header">
              <h1 className="title">Qrder</h1>
        </header>
        <body className="App-body">
        <div className="RegisterMainPanel"> 
          <div className="RegisterPanel">
            {loading ? (<div style={{color:"black"}}>
            signing up...</div>                                                             //loading notifier for panel
                ):(
                     <>
            {formVariables.map((index)=>(                                                   //tracing all form variables
            (index.name == "password")?( <>&nbsp;&nbsp;                                     {/*specified texfield for password tp align image and max rows*/}
                <TextField id={index.name} label = {index.label}                                
                type={index.type}
                inputRef={el =>index.id = el}                                               /*input reference to get form variables for registration*/
                className = {classes.main}
                onKeyUp = {(event)=>{if(event.key == "Enter"){this.register.bind(this,formVariables)}}}
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
                />{index.icon}                                                              {/*icon*/}
                <br/>
                <br/>
                </>):( <>
                <TextField id={index.name} label = {index.label}
                multiline rowsmax = {4} 
                type={index.type}
                inputRef={el =>index.id = el}                                                /*input reference to get form variables for registration*/
                className = {classes.main}
                onKeyUp = {(event)=>{if(event.key == "Enter"){this.register.bind(this,formVariables)}}}
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
                />   {index.icon}                                                              {/*icon*/}                            
                <br/>
                <br/>
                </>)
                
               
            ))}
                <span style={{float:"left",color:"#000000"}}>                                   {/*service switch*/}   
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch
                        color="default"                                                         /*styles*/   
                        id = "registerSwitch"

                        onChange={this.typeChange.bind(this)}                                   /*change handler*/
                        />{this.state.type}                                                    {/*type display*/}
                </span>
                
                <br/>
                <br/>
                 <span className="ButtonLayout">
                 <Button                                                                         /*register button*/
                    classes={{
                        root: classes.buttonRoot, 
                        label: classes.buttonLabel,
                    }}
                    onClick={this.register.bind(this,formVariables)}
                >Register</Button>
                </span>
                <span className="ButtonLayout">
                <Button                                                                         /*Back button*/
                    classes={{
                        root: classes.buttonRoot, 
                        label: classes.buttonLabel,
                    }}
                    onClick={this.login}
                >Back</Button>
                </span></>
                )}
           
          </div>
          </div>
        </body>
        
      </div>)
        
    }
}

//styles for material UI elements
const useStyles = {
    main:{
        '& label.Mui-focused': {
            color: '#000000',
          },          
    '& .MuiInput-underline:after': {
        borderBottomColor: '#000000',
      },
    },
    font:{
        color : "#000000",
        '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
          },
    },
    buttonRoot: {
        background: 'linear-gradient(45deg, #282c34e8 30%, #282c34e8 90%)',
        borderRadius: 3,
        border: 0,
        color: "#c4a748d0",
        height: 48,
        padding: '0 30px',
      },
    buttonLabel: {
        textTransform: 'capitalize',
    },
}

//redux state references
const mapStateToProps = state =>({
    token : state.token,
    user : state.user
})



export default connect(mapStateToProps,null)(withRouter(withStyles(useStyles)(RegisterPage)));