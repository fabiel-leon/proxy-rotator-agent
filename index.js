'use strict'

const tunnelAgent = require('tunnel-agent'),
  { EventEmitter } = require('events')

/**
 * 
 * 
 * @param {object} options 
 */
class ProxyRotatorAgent extends EventEmitter {
  constructor(options) {
    super();
    var self = this;
    self.options = options || {};
    self.proxies = self.options.proxies || [];
    self.index = -1;
    self.maxIndex = self.proxies.length - 1
    self.tunnelAgentsMap = new Map();
  }
  addRequest(req, options) {
    const self = this;
    const proxyOptions = self.proxies[self.index === self.maxIndex ? self.index = 0 : ++self.index]
    // console.log(proxyOptions)
    let tunnelAgentInstance = self.tunnelAgentsMap.get(proxyOptions)
    if (!tunnelAgentInstance) {
      // console.log(options)
      const reqProtocol = options.protocol || options.uri?.protocol || options._defaultAgent?.protocol;
      const uriProtocol = (reqProtocol === 'https:' ? 'https' : 'http')
      const proxyProtocol = (proxyOptions.proxy.protocol === 'https:' ? 'Https' : 'Http')
      const key = `${uriProtocol}Over${proxyProtocol}`
      // console.log(key, uriProtocol, proxyProtocol, proxyOptions)
      tunnelAgentInstance = tunnelAgent[key](proxyOptions);
      self.tunnelAgentsMap.set(proxyOptions, tunnelAgentInstance);
    }
    tunnelAgentInstance.on('free', (socket, host, port) => {
      self.emit('free', socket, host, port);
    });
    tunnelAgentInstance.addRequest(req, options);
  }
  removeSocket(socket) {
    console.log('remove socket', arguments);
  }
}

ProxyRotatorAgent.prototype.defaultPort = 443;

module.exports = ProxyRotatorAgent;





