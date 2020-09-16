
const { getCIDRinNetworkAddress,getLastTwoOctetsInNetworkAddress } = require('./util-functions');
var publicNetworkAddress = "138.94.48.0/24";

console.log(getCIDRinNetworkAddress(publicNetworkAddress));
console.log(getLastTwoOctetsInNetworkAddress(publicNetworkAddress));

