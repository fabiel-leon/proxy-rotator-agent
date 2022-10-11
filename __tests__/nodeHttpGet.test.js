require('dotenv').config();
const agent = require('./proxyRotatorAgentInstance')
const https = require('https')

function request(options, call) {
    const req = https.request(options);
    req.on('response', (res) => {
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
    it('should ', (done) => {
        const options = {
            hostname: 'httpbin.org',
            port: 443,
            path: '/ip',
            agent,
            method: 'GET',
            search: '?timestamp=1665443211335&recvWindow=10000&signature=f3f401f951d4c9b61ebffe43ff9587a4bafc785cb811b55ef9db18e5ba966d0c',
            query: 'timestamp=1665443211335&recvWindow=10000&signature=f3f401f951d4c9b61ebffe43ff9587a4bafc785cb811b55ef9db18e5ba966d0c',
            // pathname: '/sapi/v1/capital/config/getall',
            // path: '/sapi/v1/capital/config/getall?timestamp=1665443211335&recvWindow=10000&signature=f3f401f951d4c9b61ebffe43ff9587a4bafc785cb811b55ef9db18e5ba966d0c',
            // href: 'https://api.binance.com/sapi/v1/capital/config/getall?timestamp=1665443211335&recvWindow=10000&signature=f3f401f951d4c9b61ebffe43ff9587a4bafc785cb811b55ef9db18e5ba966d0c',
            method: 'GET',
            headers: {
                'X-MBX-APIKEY': [
                    'XOWRJmGRVJiXNl8nHY0i7xr2ojzzHvA4vIpdBk5s0VEYoiW4Ym2eAr8oVHo7w55U'
                ],
                Accept: ['*/*'],
                'User-Agent': ['node-fetch/1.0 (+https://github.com/bitinn/node-fetch)'],
                'Accept-Encoding': ['gzip,deflate']
            },
        };
        // Make a request
        request(options)
        request(options, done)
    }, 10000);
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