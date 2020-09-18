const { getCIDRinNetworkAddress,
    getLastTwoOctetsInNetworkAddress,
     } = require('./util-functions');

const {
    generateNewNATFirewallRule,
    generateNewNatTCPFirewallRule,
    generateNewNatUDPFirewallRule,
    generateNewNatMasqueradeFirewallRule
} = require('./generate-rules-functions');

const config = require("./config/parametersRules.json");

var version;
var outputStream;
var outInterface=config.outInternetInterface;
var publicNetworkAddress = config.publicNetworkAddress;
var multiplicationFactor= config.multiplicationFactor;

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
    outputStream+="\n"+command+"\n";
}

function generateChainRules(multiplicationFactor,lastTwoOctetsPublicNetwork){
    for(let i=0;i<multiplicationFactor;i++){
        appendOutputStream(generateNewNATFirewallRule(version,i,"100."+(64+i)+"."+lastTwoOctetsPublicNetwork+"/"+getCIDRinNetworkAddress(publicNetworkAddress)));
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

generateChainRules(multiplicationFactor,getLastTwoOctetsInNetworkAddress(publicNetworkAddress));
generateNatRules(multiplicationFactor,outInterface,publicNetworkAddress,getLastTwoOctetsInNetworkAddress(publicNetworkAddress));

console.log(getOutputStream());



