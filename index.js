const { getCIDRinNetworkAddress,
    getLastTwoOctetsInNetworkAddress,
     } = require('./util-functions');

const {
    generateNewNATFirewallRule,
    generateNewNatTCPFirewallRule,
    generateNewNatUDPFirewallRule,
    generateNewNatMasqueradeFirewallRule
} = require('./generate-rules-functions');


var version;
var outputStream;
var outInterface="bonding1";
var publicNetworkaddress = "138.94.50.0/25"
var multiplicationFactor=10;

function getOutputStream(){
    return outputStream;
}

function createOutputStream(){
    outputStream="";
    outputStream+=version;
}

function createVersion(){
    let date = new Date();
    version="Version "+date.toLocaleDateString()+"_"+date.toLocaleTimeString();
}

function appendOutputStream(command){
    outputStream+="\n"+command;
}

function generateChainRules(multiplicationFactor,lastTwoOctetsPublicNetwork){
    for(let i=0;i<multiplicationFactor;i++){
        appendOutputStream(generateNewNATFirewallRule(version,i,"100."+(64+i)+"."+lastTwoOctetsPublicNetwork+"/"+getCIDRinNetworkAddress(publicNetworkaddress)));
    }
}

function calculatePortsPerUser(multiplicationFactor){
    return parseInt((65535-1024)/multiplicationFactor);
}

function generateNatRules(multiplicationFactor,outInternetInterface,publicNetworkaddress,lastTwoOctetsPrivateNetwork){
    for(let i=0; i < multiplicationFactor;i++){
        appendOutputStream(generateNewNatTCPFirewallRule(version,i,outInternetInterface,publicNetworkaddress,"100."+(64+i)+"."+lastTwoOctetsPrivateNetwork+"/"+getCIDRinNetworkAddress(publicNetworkaddress), (i * calculatePortsPerUser(multiplicationFactor) ) + 1024 , (i * calculatePortsPerUser(multiplicationFactor)) + 1023 + calculatePortsPerUser(multiplicationFactor) ));
        appendOutputStream(generateNewNatUDPFirewallRule(version,i,outInternetInterface,publicNetworkaddress,"100."+(64+i)+"."+lastTwoOctetsPrivateNetwork+"/"+getCIDRinNetworkAddress(publicNetworkaddress), (i * calculatePortsPerUser(multiplicationFactor) ) + 1024 , (i * calculatePortsPerUser(multiplicationFactor)) + 1023 + calculatePortsPerUser(multiplicationFactor) ));
        appendOutputStream(generateNewNatMasqueradeFirewallRule(version,i,outInternetInterface,"100."+(64+i)+"."+lastTwoOctetsPrivateNetwork+"/"+getCIDRinNetworkAddress(publicNetworkaddress)));
    }
}

createVersion();
createOutputStream();

console.log()

generateChainRules(multiplicationFactor,getLastTwoOctetsInNetworkAddress(publicNetworkaddress));
generateNatRules(multiplicationFactor,outInterface,publicNetworkaddress,getLastTwoOctetsInNetworkAddress(publicNetworkaddress));

console.log(getOutputStream());



