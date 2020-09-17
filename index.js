const { getCIDRinNetworkAddress,
    getLastTwoOctetsInNetworkAddress,
     } = require('./util-functions');

const {
    generateNewNATFirewallRule,
    generateNewNatTCPFirewallRule,
    generateNewNatUDPFirewallRule,
    generateNewNatMasqueradeFirewallRule
} = require('./generate-rules-functions');


var version="";
var outputStream;
var outInterface="bonding1";
var publicNetworkaddress = "138.94.51.0/24";
var privateNetworkAddress = "100.100.51.0/24";
var multiplicationFactor=4;

function getOutputStream(){
    return outputStream;
}

function createOutputStream(){
    outputStream="";
    outputStream+=version;
}

function setVersion(){
    let date = new Date();
    version="Version "+date.toLocaleDateString()+"_"+date.toLocaleTimeString();
}

function appendOutputStream(command){
    outputStream+="\n"+command;
}

function generateChainRules(multiplicationFactor,privateNetwork){
    for(let i=0;i<multiplicationFactor;i++){
        appendOutputStream(generateNewNATFirewallRule(version,i,privateNetwork));
    }
}

function calculatePortsPerUser(multiplicationFactor){
    return parseInt((65535-1024)/multiplicationFactor);
}


function generateNatRules(multiplicationFactor,outInternetInterface,publicNetworkaddress,privateNetworkAddress){
    for(let i=0; i< multiplicationFactor;i++){
        appendOutputStream(generateNewNatTCPFirewallRule(version,i,outInternetInterface,publicNetworkaddress,privateNetworkAddress, (i * calculatePortsPerUser(multiplicationFactor) ) + 1024 , (i * calculatePortsPerUser(multiplicationFactor)) + 1023 + calculatePortsPerUser(multiplicationFactor) ));
        appendOutputStream(generateNewNatUDPFirewallRule(version,i,outInternetInterface,publicNetworkaddress,privateNetworkAddress, (i * calculatePortsPerUser(multiplicationFactor) ) + 1024 , (i * calculatePortsPerUser(multiplicationFactor)) + 1023 + calculatePortsPerUser(multiplicationFactor) ));
        appendOutputStream(generateNewNatMasqueradeFirewallRule(version,i,outInternetInterface,privateNetworkAddress ));
    }
}

setVersion();
createOutputStream();

console.log()

generateChainRules(multiplicationFactor,privateNetworkAddress);
generateNatRules(multiplicationFactor,outInterface,publicNetworkaddress,privateNetworkAddress);

console.log("Ports per User " + calculatePortsPerUser(10));
console.log(getOutputStream());



