import { Button, Switch, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, registration } from '../../requests/auth';
import {setToken, setUser} from '../../redux/actions'
import { getUserInfo } from '../../requests/restaurant';
import { AccountBox, LocationOn, Mail, Note, Phone, VpnKey } from '@material-ui/icons';



class RegisterPage extends React.Component{
    
    state = {
        loading : false,
        type : "normal"
    };

    login = () => {
        const values = {username:"postman", password : "postman"};
        const { history } = this.props;


        history.push("/login");       

    }

    typeChange= () => {
        //console.log(document.getElementById("registerSwitch").checked);
        var s = document.getElementById("registerSwitch").checked;
        this.setState({type:(s)?("self-service"):("normal")})
    }

    register = (formVars) => {
        const { history } = this.props;
        //alert(document.getElementById("registerSwitch").value);
        
        var values = [];
        values["name"]= formVars[0].id.value;
        values["address"]= formVars[1].id.value;
        values["phoneNumber"]= formVars[2].id.value;
        values["email"]= formVars[3].id.value;
        values["username"]= formVars[4].id.value;
        values["password"]= formVars[5].id.value;

        registration(values).then((response)=>{

            if(response.status == 200){
                login(values["username"],values["password"]).then((response)=>{
                    this.setState({loading : true});
                    if(response){            
                        this.props.dispatch(setToken(response.token));
                        getUserInfo(this.props.token).then((result)=>{
                            this.props.dispatch(setUser(result));
                            this.setState({loading:true});
                            history.push("/mainPage");
                        });
                    } else{
                        
                    }
                               
                }).catch((error)=>{
                    console.log("error is : " + error );
                });
            }else{
                //todo
            }      
        });
        
    }

    render(){
        const {classes } = this.props;

        const {loading} = this.state;

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
            {loading ? (<>
            signing up...</>
                ):(
                     <>
            {formVariables.map((index)=>(
            (index.name == "password")?( <>&nbsp;&nbsp;
                <TextField id={index.name} label = {index.label} 
                type={index.type}
                inputRef={el =>index.id = el} 
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
                />{index.icon}                          
                <br/>
                <br/>
                </>):( <>
                <TextField id={index.name} label = {index.label}
                multiline rowsmax = {4} 
                type={index.type}
                inputRef={el =>index.id = el} 
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
                />   {index.icon}                            
                <br/>
                <br/>
                </>)
                
               
            ))}
                <span style={{float:"left",color:"#000000"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch
                        color="default"
                        id = "registerSwitch"

                        onChange={this.typeChange.bind(this)}
                        />{this.state.type}
                </span>
                
                <br/>
                <br/>
                 <span className="ButtonLayout">
                 <Button
                    classes={{
                        root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                        label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={this.register.bind(this,formVariables)}
                >Register</Button>
                </span>
                <span className="ButtonLayout">
                <Button
                    classes={{
                        root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                        label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
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

const mapStateToProps = state =>({
    token : state.token,
    user : state.user
})



export default connect(mapStateToProps,null)(withRouter(withStyles(useStyles)(RegisterPage)));