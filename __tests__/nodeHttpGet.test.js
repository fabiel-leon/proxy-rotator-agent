require('dotenv').config();
const request = require("request");
const agent = require('./proxyRotatorAgentInstance')
const https = require('https')

describe('node:http get', () => {
    it('should ', (done) => {
        const options = {
            hostname: 'httpbin.org',
            port: 443,
            path: '/ip',
            agent,

        };
        // Make a request
        function request(options, call) {
            const req = https.request(options);
            req.on('response', (res) => {
                console.log(`Got information prior to main response:`);
                res.on('data', (d) => {
                    console.log(d.toString())
                    if (call) done()
                    // process.stdout.write(d);
                });

            });
            req.on('error', (err) => {
                console.log(`Got information prior to main response: ${err}`);
                done(err)
            });
            req.end();
        }

        request(options)
        request(options, done)
    }, 10000);
    it('should 2', () => {
        https.get({ agent, href: 'https://encrypted.google.com/' }, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                console.log
                process.stdout.write(d);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    });
});