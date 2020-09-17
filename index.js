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


setVersion();
createOutputStream();







