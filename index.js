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
    self.index = 0;
    self.maxIndex = self.proxies.length - 1
    self.tunnelAgentsMap = new Map();
  }
  addRequest(req, options) {
    const self = this;
    const proxyOptions = self.proxies[self.index === self.maxIndex ? self.index = 0 : ++self.index]
    let tunnelAgentInstance = self.tunnelAgentsMap.get(proxyOptions)
    if (!tunnelAgentInstance) {
      var uriProtocol = (options.uri.protocol === 'https:' ? 'https' : 'http')
      var proxyProtocol = (proxyOptions.proxy.protocol === 'https:' ? 'Https' : 'Http')
      console.log(uriProtocol, proxyProtocol)
      tunnelAgentInstance = tunnelAgent[`${uriProtocol}Over${proxyProtocol}`](proxyOptions);
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

module.exports = ProxyRotatorAgent;





