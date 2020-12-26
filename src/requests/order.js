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