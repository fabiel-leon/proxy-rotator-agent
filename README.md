# proxy-rotator-agent

This agent rotates requests trought especified proxies

If 2 proxies are specified
First request goes trought first proxy
Second request goes trought seconde proxy
Third request goes trought first proxy

## for mikeal/request

```js
const ProxyRotator = require('proxy-rotator-agent')

const agent = new ProxyRotator({
   proxies: [
     { host: 'proxy1.com', port: 3128, proxyAuth: 'pass', headers: { 'user-agent': 'nautilus' }},
     { host: 'proxy2.com', port: 4545, proxyAuth: 'proxy2pass', headers: { 'user-agent': 'firefox' }}
   ]
})

function optionalCallback(err, httpResponse, body) {
    console.log(err, body);
}

request({
  uri: 'https://ifconfig.net',
  json: true,
  agent,
  }, 
  optionalCallback
)

request({
  uri: 'https://ifconfig.net',
  json: true,
  agent,
  }, 
  optionalCallback
)
```

```bash
output: 
null {
      ip: '78.128.127.86',
      ip_decimal: 1317044054,
      country: 'Bulgaria',
      country_iso: 'BG',
      country_eu: true,
      latitude: 42.696,
      longitude: 23.332,
      time_zone: 'Europe/Sofia',
      asn: 'AS203380',
      asn_org: 'DA International Group Ltd.'
    }

null {
  ip: '154.6.90.11',
  ip_decimal: 2584107531,
  country: 'United States',
  country_iso: 'US',
  country_eu: false,
  region_name: 'New Mexico',
  region_code: 'NM',
  metro_code: 790,
  zip_code: '87198',
  city: 'Albuquerque',
  latitude: 35.0781,
  longitude: -106.6583,
  time_zone: 'America/Denver',
  asn: 'AS46562',
  asn_org: 'PERFORMIVE'
}
```

## for axios

```js

```