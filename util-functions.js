module.exports={
    getCIDRinNetworkAddress: (networkAddress)=> {
        return networkAddress.split("/")[1];        
    }
    ,
    getLastTwoOctetsInNetworkAddress: (networkAddress)=> {
        return networkAddress.split("/")[0].split(".")[2] +"."+ networkAddress.split("/")[0].split(".")[3];
    }
}