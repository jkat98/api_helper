(function() {
    /* jshint node: true */
    'use strict';

    var url = require('url'),
        request = require('request'),
        config = {};
    /*
     * Universal method to handle all calls to the API.
     */
    module.exports = {
        configure: function(options){
            config = options;
        },
        getAPIUrl: function(apiURL, method) {
            return url.resolve(url.format(apiURL), method);
        },
        callAPI: function(method, verb, data, callback) {
            var apiURL = {
                    protocol:       config.api.scheme,
                    hostname:       config.api.host,
                    port:           config.api.port,
                    pathname:       '/' + config.api.version + '/'
                },
                start = new Date(),
                _this = this;

            request({
                    method: verb,
                    uri: this.getAPIUrl(apiURL, method),
                    json: data
                }, function(error, response, body) {
                    var end = new Date(),
                        logLevel = 'info';
                    if (!error) {
                        if (response.statusCode >= 300) { logLevel = 'warn'; }
                        if (response.statusCode >= 400) { logLevel = 'error'; }

                        console.log(
                            response.request.method,
                            response.request.href,
                            response.statusCode,
                            '-',
                            ((end - start) + 'ms')
                        );
                    }
                    if (callback.length === 3) {
                        callback(error, response, body);
                    } else {
                        if (!error && (response.statusCode >= 200 &&
                            response.statusCode <= 299)) {
                            callback(null, body);
                        } else {
                            callback(_this.parseError(response, body), null);
                        }
                    }
                });
        },
        parseError: function parseError(res, body) {
            var defaultError = {
                status_code: 400,
                exception: 'General Error',
                message: 'General Error'
            };

            if (body) {
                defaultError.exception = body;
                defaultError.message = body;
                defaultError.status_code = res.statusCode;
            }

            return defaultError;
        }
    };
}).call(this);
