var mqtt = require("mqtt");

export const testMQTTClient = () =>{
    const Id = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODVkNjlkYjctMmRhOS00ODNkLTliM2UtMTc1ZjMwOThlMWNlIiwiaWF0IjoxNjAyODc1MTI4fQ.8Q67jsFwfPVgPH5Gj8289SB3YKUZku14n_ETeT9hzys";
    const clientId = "heroku-docker-client-" + Id;
    const topic = 'restaurant/' + Id;
    const client = mqtt.connect("wss://squid.rmq.cloudamqp.com:443/ws/mqtt", {
        clientId,
        username: "bpwppgbi:bpwppgbi",
        password: "gqHZcjGB_tvZdBpcRNfWlIjVaCpFQEe-",
        keepalive: 0,
        clean: false
      });
    
      client.on('connect', () => {
        console.log('Heroku Docker Server is connected to MQTT broker');
        client.subscribe(topic, (err) => {
          if (err) {
            console.log('[error]:', err);
            return;
          }
    
          const message = {
            opcode: 'test',
            args: [0, 1, 2]
          };
    
          client.publish(topic, JSON.stringify(message));
        });
      });
    
      client.on('message', (topic, message) => {
          console.log(Date.now());
    
        console.log(`[${topic}]: ${message}`);
       // console.log(Date.now() - Number(message));
      });

}


