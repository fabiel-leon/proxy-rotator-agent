require('dotenv').config();
const request = require("request");
const agent = require('./proxyRotatorAgentInstance')
const https = require('https')

describe('node:http get', () => {
    it('should ', (done) => {
        const options = {
            hostname: 'ifconfig.net',
            port: 443,
            path: '/',
            agent,

        };
        // Make a request
        const req = https.request(options);
        req.on('response', (res) => {
            console.log(`Got information prior to main response: ${res}`);
            done()
        });
        req.on('error', (err) => {
            console.log(`Got information prior to main response: ${err}`);
            done(err)
        });
        req.end();
    }, 10000);
    it('should 2', () => {
        https.get({ agent, href: 'https://encrypted.google.com/' }, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    });
});