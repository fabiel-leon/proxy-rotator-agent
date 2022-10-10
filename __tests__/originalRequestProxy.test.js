require('dotenv').config();
const request = require("request");
const agent = require('./proxyRotatorAgentInstance')

describe('proxy rotation', () => {
    it('proxy rotation usage', (done) => {
        const options = {
            uri: 'https://httpbin.org/ip',
            agent,
            json: true,
        }
        request(options, function optionalCallback(err, httpResponse, body) {
            console.log(err, body);
        })
        request(options, function optionalCallback(err, httpResponse, body) {
            console.log(err, body);
            done();
        })
    }, 50000);
});

