import React from "react";
import {  Button, Grid, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { Bookmark, CheckSharp, Edit, Fastfood, LocalOffer, Note } from "@material-ui/icons";
import ItemPanel from "./ItemPanel";
import { setDisplayingPanel } from "../../../redux/actions";

class ItemDetailsPanel extends React.Component {

    state = {
        item : {},
        ingredients : [],
        loading : false
    };
    componentDidMount() {
        console.log(this.props.item);
        this.setState({item : this.props.item});  
        if(this.props.item.options){            
            var temp = this.props.item.options.split(";");
        }      
        this.setState({ingredients : temp});
        
    }
    editItem = () =>{
        this.props.dispatch(setDisplayingPanel(<ItemPanel id="itemPanelUpdate" item = {this.state.item}/>));
    }
    /*<Button
        classes={{
            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
        }}
    >Edit</Button>*/

    render() {
        const {classes} = this.props;
        
        return (
            <>
                 <Grid container spacing={1}>
                    <Grid item xs={6} className="GridElement">
                            <Grid container spacing={1}>
                                
                                <Grid item xs={12} className="GridElement">
                                    <div className="BigImage">
                                        <img alt={this.state.item.img} src={this.state.item.img} width ="60%" height ="100%"/>
                                        
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="GridElement">
                                    <Button
                                        classes={{
                                            root: classes.buttonRoot, // class name, e.g. `classes-nesting-root-x`
                                            label: classes.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                                        }}
                                        onClick = {this.editItem}
                                    ><Edit/>  Edit</Button>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                        <div className="BigTag">
                            <div style={{textAlign:"left",fontSize:"15px"}}>
                                <Fastfood/>{this.state.item.name}
                                
                                <span style={{float:"right"}}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.type.name}<Bookmark/>
                                    </span> 
                                <hr/>
                                <Note/>{this.state.item.desc}
                                <br/>
                                <br/> 
                                Ingredients:
                                <br/>                           
                                {(this.props.item.options)?(this.state.ingredients.slice().map((ingredient)=>(<><CheckSharp/>{ingredient}<br/></>))):(<></>)}
                                <hr/>
                                <div style={{textAlign:"center"}}>
                                <LocalOffer/>{this.state.item.price}TL
                                </div>
                            </div>
                        </div>                            
                    </Grid>
                </Grid>
                
                </>
        );
    }
}

const useStyles = {
    
    buttonRoot: {
        background: 'linear-gradient(45deg, #c4a748d0 30%, #c4a748d0 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        width: "200px",
        height : "75px",
        padding: '0 30px',
      },
    buttonLabel: {
        
        fontSize: "30px",
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

export default connect(mapStateToProps,null)(withStyles(useStyles)(ItemDetailsPanel));

