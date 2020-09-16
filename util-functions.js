module.exports={
    getCIDRinNetworkAddress: function getCIDRinNetworkAddress(networkAddress) {
        return networkAddress.split("/")[1];        
    }
    ,
    getLastTwoOctetsInNetworkAddress: function getTwoLastOctetsInNetworkAddress(networkAddress) {
        
        return networkAddress.split("/")[0].split(".")[2] +"."+ networkAddress.split("/")[0].split(".")[3];
    }
}