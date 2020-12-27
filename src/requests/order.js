var axios = require('axios');

export const getSpecificOrder = (token,uuid) =>{
    var config = {
        method: 'get',
        url: `https://qrder-web.herokuapp.com/order?uuid=${uuid}`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
      };
      
      return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      

}

export const addOrder = (token,values) =>{
  
  var tempItems = [];

  /*values.items.map((item)=>{
    tempItems.push({"uuid":item.uuid,"options":item.options,"quantity" : `${item.quantity}`});
  });*/
  
  /*console.log({"restaurantUuid":values.restaurantUuid,
  "tableUuid":values.tableUuid,
  "items":values.items});
  
  console.log({"restaurantUuid":"56bc78e9-05fd-454c-99ad-18d479aa8ad9","tableUuid":"005dd3a6-a892-4473-94eb-87fdfc167e5d","items":[{"options":["acili","ayran"],"quantity":2,"uuid":"527e7794-254a-4385-af20-90314dcfda9c"},{"options":["ayran"],"quantity":1,"uuid":"527e7794-254a-4385-af20-90314dcfda9c"},{"options":[],"quantity":1,"uuid":"527e7794-254a-4385-af20-90314dcfda9c"},{"options":null,"quantity":1}]});
  */
  var data = JSON.stringify({"restaurantUuid":values.restaurantUuid,
  "tableUuid":values.tableUuid,
  "items":values.items});
  console.log(data);
  var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/order',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data : data
  };

  return axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });


}

