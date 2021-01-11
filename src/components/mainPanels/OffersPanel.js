import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import React from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import resClient from "../../mqtt/client";
import { getOffers, newOffer, removeOffer } from "../../requests/restaurant";

class OffersPanel extends React.Component {

    state={
        offers:[],
        previewImg : null,
        loading : true

    }

    updateView = () =>{
        this.setState({loading:true});
        getOffers(this.props.token).then((response)=>{
            this.setState({offers:response.data});
            this.setState({loading:false});
        });
    }

    componentDidMount(){
        this.updateView();
    }
    addOffer = () =>{
        var src = document.getElementById("NewOfferImage");
        var desc = document.getElementById("NewOfferDesc");
        newOffer(this.props.token,src.value).then(()=>{
            this.updateView();
            resClient.client.publish(`consumer/all`,JSON.stringify({name:this.props.user.name,img:src.value,desc:desc.value})); 
            src.value = null;
            desc.value = null;
            this.setState({previewImg:null});
            //mqtt            
        });
    }

    previewHandler= () =>{
        this.setState({previewImg:document.getElementById("NewOfferImage").value});
    }

    removeOffer = (uuid) =>{
        console.log(uuid);
        removeOffer(this.props.token,uuid).then(()=>{
            this.updateView();
            //mqtt
        })
        
    }

    render(){
        const classes = this.props.classes;
        return(<Grid container spacing ={6}>
            <Grid item xs={6} className="GridElement">
                
            {(this.state.loading)?(<Loader style={{position:"absolute",top:"45%"}}type="Oval" color="#837032"/>):(<Grid container spacing ={1}>
                    {this.state.offers.map((offer)=> (<>
                        <div className="BigImage" style={{marginBottom:"20px",marginLeft:"100px"}}>
                        <Grid item xs={14} className="GridElement">
                            <img  src={offer.img} width ="100%" height ="100%"/> 
                        </Grid>
                        </div>
                    <Grid item xs={1} className="GridElement" style={{position:"relative"}}><HighlightOff style={{position:"absolute",top:"35%",left:"10%",fontSize:"50px",cursor:"pointer"}}onClick={this.removeOffer.bind(this,offer.uuid)}/></Grid>
                    </>))}
                </Grid>)}
            </Grid>
            
            <Grid item xs={6} className="GridElement" style={{maxHeight:"200px"}}>
                
                <Grid container spacing ={1}>
                        <Grid item xs={12} className="GridElement">
                            <div className="BigImage" style={{height:"200px"}}>
                                    <img  src={this.state.previewImg} width ="100%" height ="100%"/>                                        
                            </div>
                        </Grid>
                    <Grid item xs={12} className="GridElement">
                        <TextField id="NewOfferImage" label = "New Offer Banner"                                             
                                            type="text"
                                            className = {classes.main}
                                            onChange = {this.previewHandler}
                                            style = {{marginTop:"10px"}}
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
                    </Grid>
                    <Grid item xs={12} className="GridElement">
                        <TextField id="NewOfferDesc" label = "Description" 
                                            
                                            type="text"
                                            className = {classes.main}                                            
                                            multiline rowsmax = {4} 
                                            onChange = {this.previewHandler}
                                            style = {{marginTop:"10px",width:"75%"}}
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
                    </Grid>
                    
                    <Grid item xs={12} className="GridElement">
                        <Button
                                        classes={{
                                            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                        }}
                                        onClick={this.addOffer}
                                        style = {{marginTop:"20px"}}
                                    >add</Button>
                    </Grid>
                </Grid>                  
            </Grid>
        </Grid>);
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

export default connect(mapStateToProps,null)(withStyles(useStyles)(OffersPanel));