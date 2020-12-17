import { Button, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../requests/auth';
import {setDisplayingPanel, setToken, setUser} from '../../redux/actions'
import { getUserInfo } from '../../requests/restaurant';
import TablePanel from '../mainPanels/tables/TablePanel';
import { AccountBox, VpnKey } from '@material-ui/icons';
import OrderPanel from '../mainPanels/OrderPanel';



class LoginPage extends React.Component{
    
    state = {
        loading : false
    };

    login = () => {
        const { history } = this.props;


        login(this.username.value,this.password.value).then((response)=>{
            this.setState({loading : true});
            if(response){            
                this.props.dispatch(setToken(response.token));
                getUserInfo(response.token).then((result)=>{
                    console.log(result);
                    this.props.dispatch(setUser(result));
                    this.setState({loading:true});
                    if( result.restaurantType!=null){
                        if(result.restaurantType == "normal"){
                            this.props.dispatch(setDisplayingPanel(<TablePanel/>));
                        }else{                            
                            this.props.dispatch(setDisplayingPanel(<OrderPanel/>))
                        }
                    }
                    history.push("/mainPage");
                });
            } else{
                
            }
                       
        }).catch((error)=>{
            console.log("error is : " + error );
        });       

    }

    register = () => {
        const { history } = this.props;
        history.push("/register");
    }

    render(){
        const {classes } = this.props;

        const {loading} = this.state;

        
        return(
        <div className="App">
          <header className="App-Header">
              <h1 className="title">Qrder</h1>
        </header>
        <body className="App-body">
        <div className="Panel"> 
          <div className="LoginPanel">
            {loading ? (<>
            loging in...</>
                ):(
                     <>
                     
            <TextField id="username" label = "Username" 
            defaultValue = "test10"
            className = {classes.main}
            inputRef={el => this.username = el} 
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
                 <AccountBox style={{fontSize:"50px"}}/>
                 <br/>
                 <br/>
                  <TextField id="password" label = "Password" 
                  defaultValue = "test10"
                  type="password"
                  inputRef={el => this.password = el} 
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
                 ><input type="password"/></TextField>                 
                 <VpnKey style={{fontSize:"50px"}}/>                
                 <br/>
                 <br/>
                 <span className="ButtonLayout">
                 <Button
                    classes={{
                        root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                        label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={this.login}
                >login</Button>
                </span>
                <span className="ButtonLayout">
                <Button
                    classes={{
                        root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                        label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={this.register}
                >SignUp</Button>
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
    user : state.user
})

export default connect(mapStateToProps,null)(withRouter(withStyles(useStyles)(LoginPage)));