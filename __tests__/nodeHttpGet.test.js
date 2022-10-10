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
            host: 'api.hitbtc.com',
            port: null,
            hostname: 'api.hitbtc.com',
            hash: null,
            search: null,
            query: null,
            pathname: '/api/2/public/currency',
            path: '/api/2/public/currency',
            href: 'https://api.hitbtc.com/api/2/public/currency',
            method: 'GET',
            headers: {
                // Accept: ['*/*'],
                'User-Agent': ['node-fetch/1.0 (+https://github.com/bitinn/node-fetch)'],
                // 'Accept-Encoding': ['gzip,deflate']
                // accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
                // accept-language: en-US,en;q=0.9,es;q=0.8
            },
        }
        request(options)
        request(options, done)
    }, 50000);
});