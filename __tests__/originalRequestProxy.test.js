require('dotenv').config();
const request = require("request");
const agent = require('./proxyRotatorAgentInstance')

describe('proxy rotation', () => {
    it('proxy rotation usage', (done) => {
        request({
            uri: 'https://ifconfig.net',
            agent,
            json: true,
        }, function optionalCallback(err, httpResponse, body) {
            console.log(err, body);
        })

        request({
            uri: 'https://ifconfig.net',
            agent,
            json: true,
        }, function optionalCallback(err, httpResponse, body) {
            console.log(err, body);
            done();
        })
    }, 50000);

    it('axios proxy rotation', (done) => {
        request({
            uri: 'https://ifconfig.net',
            agent,
            json: true,
        }, function optionalCallback(err, httpResponse, body) {
            console.log(err, body);
        })

        request({
            uri: 'https://ifconfig.net',
            agent,
            json: true,
        }, function optionalCallback(err, httpResponse, body) {
            console.log(err, body);
            done();
        })
    }, 50000);
});

