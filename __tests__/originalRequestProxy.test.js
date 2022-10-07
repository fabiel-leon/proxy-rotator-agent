require('dotenv').config();
const request = require("request");
const ProxyRotator = require('../');


describe('proxy rotation', () => {
    it('proxy rotation usage', (done) => {
        const agent = new ProxyRotator({
            proxies: [{
                proxy: {
                    hostname: 'pro.f-l.cyou',
                    port: 3128
                },
            },
            {
                proxy: {
                    hostname: '185.162.229.22',
                    port: 80
                },
            }]
        });

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
        const agent = new ProxyRotator({
            proxies: [{
                proxy: {
                    hostname: 'pro.f-l.cyou',
                    port: 3128
                },
            }, {
                proxy: {
                    hostname: '113.53.3.35',
                    port: 8080
                },
            }]
        });

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

