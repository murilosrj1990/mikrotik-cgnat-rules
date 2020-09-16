module.exports={
    generateNewNATFirewallRule: (versionRules,chainGroupID,privateNetworkAddress)=>{
        return `ip firewall nat add comment="CGNAT CHAIN Version-${versionRules}" disable=yes chain=srcnat src-address=${privateNetworkAddress} action=jump jump-target=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress}`
    },
    generateNewNatTCPFirewallRule: (versionRules,chainGroupID,outInternetInterface,publicNetworkAddress,privateNetworkAddress,initialPort,finalPort)=>{
        return `ip firewall nat add comment="CGNAT TCP NAT RULE Version-${versionRules}" disable=yes chain=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress} action=netmap protocol=tcp out-interface=${outInternetInterface} src-address=${privateNetworkAddress} to-addresses=${publicNetworkAddress} to-ports=${initialPort}-${finalPort}`
    },
    generateNewNatUDPFirewallRule: (versionRules,chainGroupID,outInternetInterface,publicNetworkAddress,privateNetworkAddress,initialPort,finalPort)=>{
        return `ip firewall nat add comment="CGNAT TCP NAT RULE Version-${versionRules}" disable=yes chain=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress} action=netmap protocol=udp out-interface=${outInternetInterface} src-address=${privateNetworkAddress} to-addresses=${publicNetworkAddress} to-ports=${initialPort}-${finalPort}`
    },
    generateNewNatMasqueradeFirewallRule: (versionRules,chainGroupID,outInternetInterface,privateNetworkAddress)=>{
        return `ip firewall nat add comment="CGNAT TCP NAT RULE Version-${versionRules}" disable=yes chain=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress} action=masquerade out-interface=${outInternetInterface} src-address=${privateNetworkAddress}`
    }
}