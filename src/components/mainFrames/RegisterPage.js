import { Button, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, registration } from '../../requests/auth';
import {setToken, setUser} from '../../redux/actions'
import { getUserInfo } from '../../requests/restaurant';



class RegisterPage extends React.Component{
    
    state = {
        loading : false
    };

    login = () => {
        const values = {username:"postman", password : "postman"};
        const { history } = this.props;


        history.push("/login");       

    }

    register = (formVars) => {
        const { history } = this.props;

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
            {name:"name", id:null,label : "Name",type:"text"},
            {name : "address",id:null,label : "Address",type:"text"},
            {name : "phoneNumber",id:null,label : "Phone Number",type:"tel"},
            {name : "email",id:null,label : "Email",type:"email"},
            {name : "username",id:null,label : "Username",type:"text"},
            {name : "password",id:null,label : "Password",type:"password"}];
         
        
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
                <>
                <TextField id={index.name} label = {index.label} 
                type={index.type}
                defaultValue = "postman"
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