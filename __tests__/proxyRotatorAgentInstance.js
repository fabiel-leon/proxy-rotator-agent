const ProxyRotator = require('../');

const agent = new ProxyRotator({
    proxies: [{
        proxy: {
            hostname: '94.72.140.13',
            port: 3128
        },
    },
    {
        proxy: {
            hostname: '94.72.140.14',
            port: 3128
        },
    }]
});

module.exports = agent;