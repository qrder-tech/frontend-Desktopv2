import { Button, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../requests/auth';
import {setDisplayingPanel, setMenu, setToken, setUser} from '../../redux/actions'
import { getUserInfo, requestMenu } from '../../requests/restaurant';
import TablePanel from '../mainPanels/tables/TablePanel';
import { AccountBox, VpnKey } from '@material-ui/icons';
import OrderPanel from '../mainPanels/OrderPanel';
import Loader from 'react-loader-spinner';



class LoginPage extends React.Component{
    
    state = {
        loading : false
    };

    login = () => {
        const { history } = this.props;

        this.setState({loading : true});
        login(this.username.value,this.password.value).then((response)=>{            
            if(response){            
                this.props.dispatch(setToken(response.token));
                getUserInfo(response.token).then((result)=>{
                    console.log(result);
                    this.props.dispatch(setUser(result));
                    this.setState({loading:true});
                    var temp = [];        
                    requestMenu(response.token).then((response2) => {   
                        console.log(response2);
                        for (const [key, value] of Object.entries(response2.data.items)) {                                    //check missing arguments
                            temp.push({name:key,
                                    Items:value});
                        }
                        this.props.dispatch(setMenu({catalog:response2.data.catalog,
                                                    items:temp}));
                        this.props.dispatch(setDisplayingPanel(<OrderPanel/>));
                    });
                    
                    history.push("/mainPage");
                });
            } else{
                this.setState({loading : false});
            }
                       
        }).catch((error)=>{
            console.log("error is : " + error );
            this.setState({loading : false});
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
            <Loader type="Oval" color="#837032"/></>
                ):(
                     <>
                     
            <TextField id="username" label = "Username" 
            className = {classes.main}
            inputRef={el => this.username = el} 
            onKeyUp = {(event)=>{if(event.key == "Enter"){this.login()}}}
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
                  type="password"
                  inputRef={el => this.password = el} 
                  onKeyUp = {(event)=>{if(event.key == "Enter"){this.login()}}}
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
    user : state.user,
    menu : state.menu,
})

export default connect(mapStateToProps,null)(withRouter(withStyles(useStyles)(LoginPage)));