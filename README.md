# Node.js API helper module

An API wrapper helper module for request.

Specifically this wrapper makes it easier to use request regularly when
interfacing with an API that you plan to regularly make calls to.

## To use:

Include `api_helper.js` within your project and require it like any other module.

One-time during your servers bootstrapping, configure the module.  Preferably via
settings stored in a config.json file (although not required).

Once configured, simply execute callAPI passing the following parameters:

* endpoint path
* verb (GET, POST, PUT, PATCH, DELETE, etc)
* data to send to the endpoint ({} if none)
* callback function that accepts `err, data`


## Example:

```
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


/* config.json: ***
{
    "api": {
        "scheme": "http",
        "host": "api.somedomain.com",
        "port": "8080",
        "version": "v1"
    }
}
*/
```

## To Test:

```
$ npm install -g mocha
$ mocha
```

Enjoy!
