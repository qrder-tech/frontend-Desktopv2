import React from "react";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, withStyles } from "@material-ui/core";
import { AccountBalanceWallet, AddCircle, Bookmark, CheckBox,  CheckSharp,  Face, Fastfood, HighlightOff, HourglassFull, LocalOffer, Note } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem, requestMenu, requestOrders, UpdateItem } from "../../../requests/restaurant";
import MenuPanel from "../MenuPanel";
import { setDisplayingPanel, setMenu } from "../../../redux/actions";

class ItemPanel extends React.Component {

    state = {
        loading : false,
        item : {},
        formVariables : [],
        img : null,
        preview:{
            type:0,
            name : 0,
            price : 0,
            desc : 0,
            options : [],
        },
        catalog : []
    };

    add = (formVars)=> {
            var values = [];
            formVars[1].reference = document.getElementById("types");            
            values["name"]= formVars[2].reference.value;
            values["desc"]= formVars[4].reference.value;
            values["type"] = formVars[1].reference.value;
            values["options"]= this.state.preview.options;
            values["price"]= formVars[3].reference.value;
            values["img"]= formVars[0].reference.value;            
               console.log(values); 
               console.log(this.state.item);        
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

    updateView = () =>{
        var formVariables = [
            {id:"img",label : "Image(URL)",type:"text",reference : null,default: null},
            {id:"type",label : "type",type:"select",reference : null,default: null},
            {id:"name",label : "Name",type:"text",reference : null,default: null},
            {id:"price",label : "Price",type:"text",reference : null,default: null},
            {id:"desc",label : "Description",type:"text",reference : null,default: null},
            {id:"options",label : "Optionals",type:"text",reference : null,default: null}
        ];
        
        if(this.props.item){            
            console.log("hey1");
            console.log(this.props.item);
            this.setState({item : this.props.item})
            var tempPrev = {                
                type:0,
                name : 0,
                price : 0,
                desc : 0,
                options : [],
            }
            formVariables.map((index)=>{
                index.default = this.props.item[index.id];
                if(tempPrev[index.id] == 0){                    
                    console.log("index : " + index.id + " : " + this.state.preview[index.id]);
                    console.log("here");
                    console.log({preview:{[index.id]:this.props.item[index.id]}});
                    tempPrev[index.id] =  this.props.item[index.id];
                }
            });
            var temp = [];
            if(this.props.item.options){
                this.props.item.options.split(";").map((option)=>{
                temp.push(option);
                });
            }
            tempPrev.options = temp;            
            this.setState({preview:tempPrev});
            this.setState({img:this.props.item.img})
        }else{
            this.setState({
                loading : false,
                item : {},
                formVariables : [],
                img : null,
                preview:{
                    type:0,
                    name : 0,
                    price : 0,
                    desc : 0,
                    options : [],
                },
                catalog : []
            })
        }
        if(this.props.menu.catalog){
            this.setState({catalog:this.props.menu.catalog})
        }else{
            var temp = [];
            requestMenu(this.props.token).then((response) => {   
                for (const [key, value] of Object.entries(response.data.items)) {                                    //check missing arguments
                  temp.push({name:key,
                            Items:value});
              }
              this.setState({rows:temp});
              this.props.dispatch(setMenu({catalog:response.data.catalog,
                                            items:temp}));
              
              this.setState({catalog:response.data.catalog})
            });
        }
        this.setState({formVariables});
    }
    componentDidMount() {
       this.updateView();
    }

    imageRender = () =>{
        console.log(this.state.formVariables[0].reference.value);
        this.setState({img:this.state.formVariables[0].reference.value});
    }

    typeRender = () =>{
        
        var temp = this.state;
        temp.preview.type = document.getElementById("types").value;
        console.log(temp);
        this.setState(temp); 
    }

    addMetadata = () =>{
        var temp = this.state;
        console.log(temp);
        temp.preview.options.push(document.getElementById("options").value);
        document.getElementById("options").value = "";
        console.log(temp);
        this.setState(temp);
    }

    removeOption = (ingredient) =>{
        
        var temp = this.state;
        temp.preview.options.splice(temp.preview.options.indexOf(ingredient),1);
        this.setState(temp);
    }

    changeHandler = (contentId) =>{
        
        var temp = this.state;
        var value = document.getElementById(contentId).value;
        switch (contentId){
            case "name":
                temp.preview.name = value;
                break;
            case "price":
                temp.preview.price = value;
                break;
            case "desc":
                temp.preview.desc = value;
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
                                        <img  src={this.state.img} width ="60%" height ="100%"/>                                        
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="GridElement">
                                    <div className="BigTag4"> 
                                        <div style={{textAlign:"left",minWidth:"100%",fontSize:"15px"}}>
                                        <Fastfood/>{this.state.preview.name}
                                    
                                            <span style={{float:"right"}}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;{this.state.preview.type}<Bookmark/>
                                            </span> 
                                            <hr/>
                                            <Note/>{this.state.preview.desc}
                                            <br/>
                                            <br/> 
                                            Optionals:
                                            <br/>              
                                        {this.state.preview.options.map((ingredient)=>(
                                            <>
                                            <CheckSharp/>{ingredient} <HighlightOff style={{fontSize:"12px"}} onClick={this.removeOption.bind(this,ingredient)}/>
                                            <br/>
                                            </>
                                        ))}  
                                        <hr/>  
                                        <div style={{textAlign:"center"}}>
                                        <LocalOffer/>Price : {this.state.preview.price} TL
                                        </div>                             
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
                                    >{(this.props.item) ? (<>Update</>):(<>Add</>)}</Button>
                                    </span>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                    <Grid item xs={6} className="GridElement">
                            <div style={{textAlign:"left"}}>
                            {formVariables.map((index)=>(
                                (index.id == "type")?(<>
                                <div className="SelectLabel">Type</div> 
                                <input id="types" autoComplete="off" className="Select" type="text" list="typelist" onChange={this.typeRender} defaultValue={index.default}/>
                                <datalist id="typelist" className="Select">
                                    {this.state.catalog.map((type)=>(
                                    <option id = {type.uuid} value={type} className="Option">{type}</option>))}
                                </datalist> 
                                <br/>
                                <br/>
                                </>):(<>
                                    <TextField id={index.id} label = {index.label} 
                                    
                                    type={index.type}
                                    inputRef={el =>index.reference = el} 
                                    className = {classes.main}
                                    defaultValue = {index.default}
                                    onChange = {(index.id == "img") ? (this.imageRender):((index.id == "options")?(null):(this.changeHandler.bind(this,index.id)))}
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
                                    />   {(index.id == "options")?(<AddCircle style={{paddingTop:"20px",cursor:"pointer"}} onClick={this.addMetadata} />):(null)}                          
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

export default connect(mapStateToProps,null)(withStyles(useStyles)(ItemPanel));

