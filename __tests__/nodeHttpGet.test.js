require('dotenv').config();
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
});