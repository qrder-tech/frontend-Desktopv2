
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector} from 'react-redux';
import { setDisplayingPanel, setToken, setUser, test } from './redux/actions';
import ApplicationRoutes from './ApplicationRoutes';
import TablePanel from './components/mainPanels/tables/TablePanel';
import { getUserInfo, removeItem } from './requests/restaurant';
import OrderPanel from './components/mainPanels/OrderPanel';
import { Connector } from 'react-mqtt-client'
import mqtt from "mqtt";
let client;
let topic ;

export const clientSetter = (token,callback,updateCallback) =>{
  if(client){
    return client;
  }else{
    /*topic = 'restaurant/tables/' +JSON.parse(localStorage.getItem("user")).uuid + '/#' ;
    client = mqtt.connect("mqtt://squid.rmq.cloudamqp.com", {
      clientId: token,
      username: "bpwppgbi:bpwppgbi",
      password: "gqHZcjGB_tvZdBpcRNfWlIjVaCpFQEe-",
      keepalive: 0,
      clean: false
   
    });     
    console.log(client + " : " + token);
    client.on('connect', () => {
      console.log('Heroku Docker Server is connected to MQTT broker');
      client.subscribe(topic, (err) => {
        if (err) {
          console.log('[error]:', err);
          return;
        }
  
      });
    });
    client.on('message', (topic, message) => {
      console.log(Date.now());
      
      callback(message);
    
    });*/
    var options = {
      username: "qgetbbky",
      password: "F7AMZy_xADKj",
      keepalive: 0,
      clean: false,
      clientId: token    
    };
    client  =mqtt.connect("wss://hairdresser.cloudmqtt.com:35697", {
      username: "qgetbbky",
      password: "F7AMZy_xADKj",
      keepalive: 0,
      clean: false,
      clientId: token    
  });
    if(JSON.parse(localStorage.getItem("user"))){
      topic = 'restaurant/tables/' +JSON.parse(localStorage.getItem("user")).uuid + '/#' ;
      client.subscribe(topic);

      client.on('connect', () => {
        console.log('Heroku Docker Server is connected to MQTT broker');
        client.subscribe(topic, (err) => {
          if (err) {
            console.log('[error]:', err);
            return;
          }
  
        });
    });
    
      client.on('message', function (topic, message) {
      
      // Updates React state with message 
      console.log(message.toString());
      console.log(topic);
      callback(message.toString());
      });
    }else{
      getUserInfo(token).then((response)=>{
        topic = 'restaurant/tables/' +response.uuid + '/#' ;
        client.subscribe(topic);

        client.on('connect', () => {
          console.log('Heroku Docker Server is connected to MQTT broker');
          client.subscribe(topic, (err) => {
            if (err) {
              console.log('[error]:', err);
              return;
            }
    
          });
        });
      
        client.on('message', function (topic, message) {
        
        // Updates React state with message 
        console.log(message.toString());
        console.log(topic);
        callback(message.toString());
        });
      });
    }

    // preciouschicken.com is the MQTT topic
   

  }  
}

function App() {
  /*const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  return (
    <>
    hey + {token}
    <br/>
    <button onClick={()=> dispatch(setToken("newtoken1"))}>setToken</button>
    </>
  );*/  
   
  const dispatch = useDispatch();
  
  if(localStorage.getItem("token")){   
    clientSetter(localStorage.getItem("token"),(message)=>dispatch(test(message)));
    dispatch(setToken(localStorage.getItem("token")));
    var user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
    dispatch(setDisplayingPanel(<OrderPanel/>));
  }

 /* const dispatch = useDispatch();
  dispatch(setToken(localStorage.getItem("token")));*/
    return ApplicationRoutes();
  
}

export default App;
