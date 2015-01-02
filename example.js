var api = require('../api_helper'),
    config = require('./config');

// call one-time during server bootstrap:
api.configure(config);

// call anytime:
api.callAPI('users/list', 'GET', {}, function(err, body) {
    if (!err) {
        console.log(body);  // => data returned from API endpoint!
    }
});

