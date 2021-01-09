var axios = require('axios');

const moment = require('moment');

export const editProfile = (token,values) => {
  console.log(values);
  var qs = require('qs');
  var data = qs.stringify(values);
  var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/restaurant/me',
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
    console.log(error);
  });
}

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
  var data = JSON.stringify({"name":name});

  var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/restaurant/table',
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
  });

}

export const addService = (token,service,tableUuid) =>{
    var qs = require('qs');
    var data = qs.stringify({
    'name': service,
    'createdAt': moment().format() 
    });
    var config = {
      method: 'post',
      url: `https://qrder-web.herokuapp.com/restaurant/table/services?uuid=${tableUuid}`,
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
      console.log(error);
  });
}

export const removeService = (token,service,tableUuid) =>{
  var qs = require('qs');
  var data = qs.stringify({
  'name': service
  });
  var config = {
    method: 'delete',
    url: `https://qrder-web.herokuapp.com/restaurant/table/services?uuid=${tableUuid}`,
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
    console.log(error);
  });

}

export const getTable = (token,uuid) =>{
  
    var config = {
      method: 'get',
      url: `https://qrder-web.herokuapp.com/restaurant/table?uuid=${uuid}`,
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
    });

}

export const removeTable = (token,tableUuid) =>{
  var config = {
    method: 'delete',
    url: `https://qrder-web.herokuapp.com/restaurant/table?uuid=${tableUuid}`,
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
  });
  
}

export const getMetrics = (token) =>{

  var config = {
    method: 'get',
    url: 'https://qrder-web.herokuapp.com/restaurant/metrics',
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
  });

  
}

export const getOffers = (token) =>{
  var config = {
    method: 'get',
    url: 'https://qrder-web.herokuapp.com/restaurant/offers',
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
  });
}

export const newOffer = (token,src) =>{
  var qs = require('qs');
  var data = qs.stringify({
  'img': src 
  });
  var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/restaurant/offers',
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
    console.log(error);
  });
}

export const removeOffer = (token,uuid) =>{
  var qs = require('qs');
  var data = qs.stringify({
    
  });
  var config = {
    method: 'delete',
    url: `https://qrder-web.herokuapp.com/restaurant/offers?uuid=${uuid}`,
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