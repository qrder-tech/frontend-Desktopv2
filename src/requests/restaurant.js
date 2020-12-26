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
    url: 'https://qrder-web.herokuapp.com/order/all',
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
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
  
} 

export const addItem = (values,token) =>{
    var data = JSON.stringify({
      "name":values["name"],
      "desc":values["desc"],
      "type":values["type"],
      "options":values["options"],
      "price":values["price"],
      "img":values["img"]});
    var config = {
        method: 'post',
        url: 'https://qrder-web.herokuapp.com/restaurant/item',
        headers: {  
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    return axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.data || error.response || error;
    });
}

export const UpdateItem = (values,token, uuid) =>{
  var data = JSON.stringify({
    "name":values["name"],
    "desc":values["desc"],
    "type":values["type"],
    "options":values["options"],
    "price":values["price"],
    "img":values["img"]});
  var config = {
      method: 'post',
      url: `https://qrder-web.herokuapp.com/restaurant/item?uuid=${uuid}`,
      headers: {  
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };

  return axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
    return error.response.data || error.response || error;
  });
}

export const removeItem = (uuid,token)=>{
  var config = {
    method: 'delete',
    url: `https://qrder-web.herokuapp.com/restaurant/item?uuid=${uuid}`,
    headers: { 
      'Authorization': `Bearer ${token}`
    }
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

export const changeItemStatus = (uuid,token,status) =>{
  var data = JSON.stringify({"enabled":status});

  var config = {
    method: 'post',
    url: `https://qrder-web.herokuapp.com/restaurant/item?uuid=${uuid}`,
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const addOrder = (token,order) =>{

  var tempItems = [];

  order.items.map((item)=>{
    tempItems.push({"uuid":item.uuid,"metadata":item.metadata,"quantity" : `${item.quantity}`});
  });

  var data = JSON.stringify({
    "restaurantUuid":"56bc78e9-05fd-454c-99ad-18d479aa8ad9",
    "userUuid":"3d9b7b60-741f-45aa-b94a-68daa30b7ea6",
    "table_id":"af92bacf-a01a-4903-99d6-2887359c1d23",
    "items":tempItems});

  var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/order/new',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data : data
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

export const addSubtopic = (name,token) =>{
  var qs = require('qs');
  var data = qs.stringify({
   'name': name 
  });
  var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/restaurant/subtopic',
    headers: {       
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    return response;
  })
  .catch(function (error) {
    return error;
    //console.log(error);
  });
}


export const getTablesRequest = (token) =>{
  var config = {
    method: 'get',
    url: 'https://qrder-web.herokuapp.com/restaurant/tables',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  };
  
  return axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
      return error;
    
  });
  
}

export const createTable = (name,token) =>{
    var qs = require('qs');
    var data = qs.stringify({
    'name': name 
    });
    var config = {
      method: 'post',
      url: 'https://qrder-web.herokuapp.com/restaurant/tables',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    return axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      return response;
    })
    .catch(function (error) {
      //console.log(error);
      return error;
    });

}