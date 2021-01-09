import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { getOffers, newOffer, removeOffer } from "../../requests/restaurant";

class OffersPanel extends React.Component {

    state={
        offers:[],
        previewImg : null

    }

    updateView = () =>{
        getOffers(this.props.token).then((response)=>{
            this.setState({offers:response.data});
        });
    }

    componentDidMount(){
        this.updateView();
    }
    addOffer = () =>{
        var src = document.getElementById("NewOfferImage");
        newOffer(this.props.token,src.value).then(()=>{
            this.updateView();
            src.value = null;
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
        return(<Grid container spacing ={1}>
            <Grid item xs={6} className="GridElement">
                <Grid container spacing ={1}>
                    {this.state.offers.map((offer)=> (<>
                        <Grid item xs={11} className="GridElement">
                        <div className="BigImage">
                            <img  src={offer.img} width ="60%" height ="60%"/>                                        
                        </div>
                    </Grid>
                    <Grid item xs={1} className="GridElement" style={{align:"center"}}><HighlightOff onClick={this.removeOffer.bind(this,offer.uuid)}/></Grid>
                    </>))}
                </Grid>
            </Grid>
            
            <Grid item xs={6} className="GridElement" style={{maxHeight:"200px"}}>
                
                <Grid container spacing ={1}>
                    <Grid item xs={12} className="GridElement">
                        <div className="BigImage">
                            <img  src={this.state.previewImg} width ="60%" height ="100%"/>                                        
                        </div>
                    </Grid>
                    <Grid item xs={12} className="GridElement">
                        <TextField id="NewOfferImage" label = "New Offer" 
                                            
                                            type="text"
                                            className = {classes.main}
                                            onChange = {this.previewHandler}
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
    token : state.token
  })

export default connect(mapStateToProps,null)(withStyles(useStyles)(OffersPanel));