const RouterOSClient = require('routeros-client').RouterOSClient;
 
const api = new RouterOSClient({
    host: "192.168.88.1",
    user: "api_user",
    password: "12345678"
});
 
api.connect().then((client) => {
    // After connecting, the promise will return a client class so you can start using it
 
    // You can either use spaces like the winbox terminal or
    // use the way the api does like "/system/identity", either way is fine
    client.menu("/system identity").getOnly().then((result) => {
        //console.log(result.identity); // Mikrotik
        console.log(result); // Whole Identity Body Mikrotik
        console.log("------------")
        console.log(result.name); // Identity Name
        //api.close();

        //createPPPOEUser("mathara","mathara2020","PPPoE-2Mbs");
        disablePPPOEUser("mathara");
       // enablePPPOEUser("mathara");

    }).catch((err) => {
        console.log(err); // Some error trying to get the identity
        api.close();
    });
 
}).catch((err) => {
    // Connection error
    console.log(err);
});

function createPPPOEUser(PPPoEUserName, PPPoEUserPassword, PPPoEUserProfile){

    api.connect().then((client) => {
        // After connecting, the promise will return a client class so you can start using it
     
        // You can either use spaces like the winbox terminal or
        // use the way the api does like "/system/identity", either way is fine
       
        const pppUserMenu = client.menu("/ppp secret");

        pppUserMenu.add({
            name: PPPoEUserName,
            password: PPPoEUserPassword,
            service: "pppoe",
            profile: PPPoEUserProfile
        }).then((response) => {
            console.log(response); 
            /* { 
                '$$path': "/interface/vlan",
                id: "*EA",
                name: "vlan40",
                mtu: 1500,
                interface: "ether1",
                vlanId: 40,
                ...
            } */
            api.close();
        }).catch((err) => {
            // Error adding
            console.log(err);
            api.close();
        });
     
    }).catch((err) => {
        // Connection error
        console.log(err);
    });
}

function disablePPPOEUser(PPPoEUser){

    api.connect().then((client) => {
        // After connecting, the promise will return a client class so you can start using it
        // You can either use spaces like the winbox terminal or
        // use the way the api does like "/system/identity", either way is fine
        const pppUserMenu = client.menu("/ppp secret");

        pppUserMenu.where("name",PPPoEUser).update({
            //name: "kelvin_murithi", //add any other parameters to update here in this object body
            disabled: true
        }).then((response) => {
            console.log(response); 
            //todo remove ppp interface
            api.close();
        }).catch((err) => {
            // Error adding
            console.log(err);
            api.close();
        });
     
    }).catch((err) => {
        // Connection error
        console.log(err);
        api.close();
    });
}

function enablePPPOEUser(PPPoEUser){

    api.connect().then((client) => {
        // After connecting, the promise will return a client class so you can start using it
        // You can either use spaces like the winbox terminal or
        // use the way the api does like "/system/identity", either way is fine
        const pppUserMenu = client.menu("/ppp secret");

        pppUserMenu.where("name",PPPoEUser).update({
            //name: "kelvin_murithi", //add any other parameters to update here in this object body
            disabled: false
        }).then((response) => {
            console.log(response); 
            //todo remove ppp interface
            api.close();
        }).catch((err) => {
            // Error adding
            console.log(err);
            api.close();
        });
     
    }).catch((err) => {
        // Connection error
        console.log(err);
        api.close();
    });
}