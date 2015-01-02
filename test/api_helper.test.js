/* jshint node:true */
/* global global, require, describe, beforeEach, afterEach, it, expect */
/* jshint expr: true, camelcase: false, unused: vars */
'use strict';
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);

var proxyquire = require('proxyquire'),
    requestStub = sinon.stub(),
    urlStub = {},
    helper = proxyquire('../api_helper', {
            'url': urlStub,
            'request': requestStub
        });

describe('API Helper', function(){
    beforeEach(function(){
        var options = {
            api: {
                protocol:       'http',
                hostname:       'localhost',
                port:           12345,
                pathname:       '/v1/'
            }
        };
        helper.configure(options);
    });
    describe('getAPIUrl', function(){
        var url;
        beforeEach(function(){
            urlStub.resolve = sinon.spy();
            sinon.stub(urlStub, 'format', function(){
                return 'testurl';
            });

            url = {
                protocol:       'http',
                hostname:       'localhost',
                port:           12345,
                pathname:       '/v1/'
            };
            helper.getAPIUrl(url, 'GET');
        });
        afterEach(function(){
            urlStub.format.restore();
        });

        it('should format the Url', function(){
            expect(urlStub.format).to.have.been.calledWith(url);
        });
        it('should resolve the Url and Method', function(){
            expect(urlStub.resolve).to.have.been
            .calledWith('testurl', 'GET');
        });
    });

    describe('callAPI', function(){
        var callback;
        beforeEach(function(){
            callback = sinon.spy();
            sinon.stub(helper, 'getAPIUrl', function(){
                return 'testing/123';
            });
            requestStub.reset();
        });
        afterEach(function(){
            helper.getAPIUrl.restore();
        });

        it('should make a request', function(){
            helper.callAPI('users/test', 'GET', {}, callback);
            expect(requestStub).to.have.been.calledWith({
                method: 'GET',
                uri: 'testing/123',
                json: {},
            }, sinon.match.func);
        });
    });
});
