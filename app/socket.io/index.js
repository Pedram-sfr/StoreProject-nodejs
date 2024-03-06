const NamespaceSocketHandler = require("./namespace.socket")

module.exports = {
    socketHandler: (io)=>{
        new NamespaceSocketHandler(io).initConnetion()
        new NamespaceSocketHandler(io).createNamespacesConnection()
    }
}