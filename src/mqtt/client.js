import { addService } from "../requests/restaurant";

var mqtt = require("mqtt");

const resClient = {
  client : null,
  connected : false,
  clientId : null
}


resClient.init = (token,uuid)=>{
  if(resClient.connected){
    return;
  }
  resClient.client = mqtt.connect("wss://hairdresser.cloudmqtt.com:35697", {
      username: "qgetbbky",
      password: "F7AMZy_xADKj",
      keepalive: 0,
      clean: false,
      clientId: token    
  });
  resClient.client.on('connect', () => {
    console.log('Heroku Docker Server is connected to MQTT broker');
    resClient.connected = true;
    var topic = 'restaurant/' + uuid + '/#' 
    resClient.client.on("message",(topic,message) =>{
      console.log("mqtt : " + message);
      if(message.toString() == "table"){
        const event = new Event('table'); 
        document.dispatchEvent(event);
      }else if(message.toString() == "order" || message.toString() == "ready"){
        const event = new Event('order'); 
        document.dispatchEvent(event);
      }else{
        var parsedMessage = message.toString().split(":");
        if(parsedMessage.length == 2 && parsedMessage[0] == "service"){
          var table = topic.split("/")[2];
          addService(token,parsedMessage[1],table).then(()=>{            
            const event = new Event('table'); 
            document.dispatchEvent(event);
          });
          /*const event = new CustomEvent("service",{detail:{type:parsedMessage[1],table:table}});
          document.dispatchEvent(event);*/
        }
      }
    });
    resClient.client.subscribe(topic, (err) => {      
      if (err) {
        console.log('[error]:', err);
        return;
      }
    });
  });
      
}

export default resClient;

