# MikrotikRouterOS-APIs
-> This repo uses Node routeros-client which is a wrapper for node-routeros api.  
-> Am developing this to integrate with our internal WISP CRM with all basic functionalities for user management, suspension, reconnection etc.  
-> This can be used by any ISP using PPPOE on the network to integrate with their custom CRM  
-> When using remote winbox VPN to connect with mikrotik router API port, Enter the local router API Port when adding the router to remote winbox then use the IP:Port given by remote winbox to connect using routeros-client. The port given by remote winbox will be diffrent from the port from your mikrotik router. NB (Use remotewinbox port not local api port)