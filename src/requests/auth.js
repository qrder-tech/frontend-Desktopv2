var axios = require('axios');

export const login = (username,password) =>{
    var qs = require('qs');
    var data = qs.stringify({
    'username': username,
    'password': password 
    });
    var config = {
    method: 'post',
    url: 'https://qrder-web.herokuapp.com/auth/login?type=restaurant',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };

    return axios(config)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error;
    });

}