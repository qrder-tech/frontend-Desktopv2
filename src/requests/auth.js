var axios = require('axios');
var qs = require('qs');

export const login = (username,password) =>{
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

export const registration = (values) =>{
    var data = qs.stringify({
        'name': values["name"],
        'address': values["address"],
        'phoneNumber': values["phoneNumber"],
        'email': values["email"],
        'serviceType': values["service"],
        'username': values["username"],
        'password': values["password"] 
    });

    var config = {
        method: 'post',
        url: 'https://qrder-web.herokuapp.com/auth/registration?type=restaurant',
        headers: { 
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
