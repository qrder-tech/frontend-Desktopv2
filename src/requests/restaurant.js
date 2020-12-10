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

