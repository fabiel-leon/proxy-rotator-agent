# proxy-rotator-agent

This agent rotates requests trought especified proxies

If 2 proxies are specified
First request goes trought first proxy
Second request goes trought seconde proxy
Third request goes trought first proxy

## for mikeal/request

```js
const request = require('request');
const ProxyRotator = require('proxy-rotator-agent')

const agent = new ProxyRotator({
   proxies: [
     { host: '10.0.0.1', port: 3128, proxyAuth: 'pass', headers: { 'user-agent': 'nautilus' }},
     { host: '10.0.0.2', port: 4545, proxyAuth: 'proxy2pass', headers: { 'user-agent': 'firefox' }}
   ]
})

function optionalCallback(err, httpResponse, body) {
    if(err) return console.error(err);
    console.log(err, body);
}

request({
  uri: 'https://httpbin.org/ip',
  json: true,
  agent,
  }, 
  optionalCallback
)

request({
  uri: 'https://httpbin.org/ip',
  json: true,
  agent,
  }, 
  optionalCallback
)
```

Output

```js
{
  ip: '10.0.0.1'
}
{
  ip: '10.0.0.2'
}
```

## for native https request

```js
const https = require('https');
const ProxyRotator = require('proxy-rotator-agent')

const agent = new ProxyRotator({
   proxies: [
     { host: '10.0.0.1', port: 3128, proxyAuth: 'pass', headers: { 'user-agent': 'nautilus' }},
     { host: '10.0.0.2', port: 4545, proxyAuth: 'proxy2pass', headers: { 'user-agent': 'firefox' }}
   ]
})
const options = {
    hostname: 'httpbin.org',
    port: 443,
    path: '/ip',
    agent,

};
// Make a request
function request(options) {
    const req = https.request(options);
    req.on('response', (res) => {
        res.on('data', (data) => {
            console.log(data.toString())
        });
    });
    req.on('error', (err) => {
        console.error(err);
    });
    req.end();
}

request(options)
request(options)
```

Output:

```bash
{
  "origin": "10.0.0.1"
}
{
  "origin": "10.0.0.2"
}
```

## for axios

```js

```
