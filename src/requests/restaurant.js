var axios = require('axios');


export const getUserInfo = (token) => {

    var config = {
        method: 'get',
        url: 'https://qrder-web.herokuapp.com/restaurant/me',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      
      return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });

}

export const requestOrders = (token) =>{
    var config = {
      method: 'get',
      url: 'https://qrder-web.herokuapp.com/restaurant/orders',
      headers: { 
        'Authorization':  `Bearer ${token}`
      }
    };

    return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error
    });

}

export const requestMenu = (token) =>{
  var config = {
    method: 'get',
    url: 'https://qrder-web.herokuapp.com/restaurant/menu',
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };
  
  return axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
  
} 

export const addItem = (values,token) =>{
    var qs = require('qs');
    var data = qs.stringify({
    'name': values["name"],
    'price': values["price"],
    'desc': values["desc"],
    'metadata': values["metadata"],
    'img': values["image"]
    });
    var config = {
      method: 'post',
      url: 'https://qrder-web.herokuapp.com/restaurant/item',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    return axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data || error.response || error;
    });
}

