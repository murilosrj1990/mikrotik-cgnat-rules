module.exports={
    generateNewNATFirewallRule: (versionRules,chainGroupID,privateNetworkAddress)=>{
        return `ip firewall nat add comment="CGNAT CHAIN ${versionRules}" \\ \ndisable=yes chain=srcnat src-address=${privateNetworkAddress} \\ \naction=jump jump-target=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress}`
    },
    generateNewNatTCPFirewallRule: (versionRules,chainGroupID,outInternetInterface,publicNetworkAddress,privateNetworkAddress,initialPort,finalPort)=>{
        return `ip firewall nat add comment="CGNAT TCP NAT RULE ${versionRules}" \\ \ndisable=yes chain=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress} action=netmap protocol=tcp \\ \nout-interface=${outInternetInterface} src-address=${privateNetworkAddress} to-addresses=${publicNetworkAddress} to-ports=${initialPort}-${finalPort}`
    },
    generateNewNatUDPFirewallRule: (versionRules,chainGroupID,outInternetInterface,publicNetworkAddress,privateNetworkAddress,initialPort,finalPort)=>{
        return `ip firewall nat add comment="CGNAT TCP NAT RULE ${versionRules}" \\ \ndisable=yes chain=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress} action=netmap protocol=udp \\ \nout-interface=${outInternetInterface} src-address=${privateNetworkAddress} to-addresses=${publicNetworkAddress} to-ports=${initialPort}-${finalPort}`
    },
    generateNewNatMasqueradeFirewallRule: (versionRules,chainGroupID,outInternetInterface,privateNetworkAddress)=>{
        return `ip firewall nat add comment="CGNAT TCP NAT RULE ${versionRules}" \\ \ndisable=yes chain=cgnat-rules-group-${chainGroupID}-${privateNetworkAddress} action=masquerade \\ \nout-interface=${outInternetInterface} src-address=${privateNetworkAddress}`
    }
}