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

setVersion();
createOutputStream();

generateChainRules(5,"100.100.51.0/24");

console.log(getOutputStream());



