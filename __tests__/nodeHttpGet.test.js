require('dotenv').config();
const agent = require('./proxyRotatorAgentInstance')
const https = require('https')

function request(options, call) {
    const req = https.request(options);
    const key = 'req' + Math.random()
    console.time(key)
    req.on('response', (res) => {
        console.timeEnd(key)
        console.log(`Got information prior to main response:`);
        res.on('data', (d) => {
            console.log(d.toString().slice(0, 50))
            if (call) call()
            // process.stdout.write(d);
        });

    });
    req.on('error', (err) => {
        console.log(`Got information prior to main response: ${err}`);
        if (call) call(err)
    });
    req.end();
}

describe('node:http get', () => {
    it('should ', async (done) => {
        const options = {
            hostname: 'httpbin.org',
            port: 443,
            path: '/ip',
            agent,
            method: 'GET',
        };
        // Make a request
        for (let index = 0; index < 100; index++) {
            await new Promise((res, rej) => request(options, res));
            await new Promise((res, rej) => setTimeout(res, 2000));
        }
    }, 100000);
    it('filled request', (done) => {
        const options = {
            protocol: 'https:',
            slashes: true,
            auth: null,
            host: 'api.binance.com',
            port: null,
            hostname: 'api.binance.com',
            hash: null,
            // search: '?timestamp=1665446579453&recvWindow=10000&signature=eecb0b4919d8320990a7cc39606df0af8c0d8849c39729b15e41d2cfc75bc21d',
            // query: 'timestamp=1665446579453&recvWindow=10000&signature=eecb0b4919d8320990a7cc39606df0af8c0d8849c39729b15e41d2cfc75bc21d',
            pathname: '/sapi/v1/capital/config/getall',
            path: '/sapi/v1/capital/config/getall',
            href: 'https://api.binance.com/sapi/v1/capital/config/getall',
            method: 'GET',
            headers: {
                Accept: ['*/*'],
                'User-Agent': ['node-fetch/1.0 (+https://github.com/bitinn/node-fetch)'],
                'Accept-Encoding': ['gzip,deflate']
            },
            agent,
        }
        request(options)
        request(options, done)

    }, 50000);
});