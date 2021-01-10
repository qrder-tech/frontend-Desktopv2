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

export const updateOrder = (token,values,orderUuid) =>{
  
  var data = JSON.stringify({"restaurantUuid":values.restaurantUuid,
  "tableUuid":values.tableUuid,
  "items":values.items});
  console.log(data);
  var config = {
    method: 'post',
    url: `https://qrder-web.herokuapp.com/order?uuid=${orderUuid}`,
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

export const removeOrder = (token,uuid) =>{
  var data = '';

  var config = {
    method: 'delete',
    url: `https://qrder-web.herokuapp.com/order?uuid=${uuid}`,
    headers: { 
      'Content-Type': 'application/json',     
      'Authorization': `Bearer ${token}`
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const serveOrder = (token,uuid) =>{
  var data = JSON.stringify({"status":"served"});

  var config = {
    method: 'post',
    url: `https://qrder-web.herokuapp.com/order?uuid=${uuid}`,
    headers: { 
      'Content-Type': 'application/json',   
      'Authorization': `Bearer ${token}`
    },
    data : data
  };

  return axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const payOrder = (token , uuid) =>{
  var qs = require('qs');
  var data = qs.stringify({
    
  });
  var config = {
    method: 'post',
    url: `https://qrder-web.herokuapp.com/order/pay?uuid=${uuid}`,
    headers: { 
      'Authorization': `Bearer ${token}`
    },
    data : data
  };

  return axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

