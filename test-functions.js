
const { getCIDRinNetworkAddress,
    getLastTwoOctetsInNetworkAddress,
     } = require('./util-functions');

const {
    generateNewNATFirewallRule,
    generateNewNatTCPFirewallRule,
    generateNewNatUDPFirewallRule,
    generateNewNatMasqueradeFirewallRule
} = require('./generate-rules-functions');

var publicNetworkAddress = "138.94.48.0/24";

console.log(getCIDRinNetworkAddress(publicNetworkAddress));
console.log(getLastTwoOctetsInNetworkAddress(publicNetworkAddress));
console.log(generateNewNATFirewallRule("12341234",2,"100.100.51.0/24"));
console.log(generateNewNatTCPFirewallRule("12341234",2,"bonding1","138.94.51.0/24","100.100.51.0/24",2000,5000));
console.log(generateNewNatUDPFirewallRule("12341234",2,"bonding1","138.94.51.0/24","100.100.51.0/24",2000,5000));
console.log(generateNewNatMasqueradeFirewallRule("12341234",2,"bonding1","100.100.51.0/24"));