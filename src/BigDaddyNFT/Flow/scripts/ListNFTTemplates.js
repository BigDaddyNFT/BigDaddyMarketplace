export const LIST_NFT_TEMPLATES_SCRIPT = `import BigDaddyMarketplaceContract from 0x03

pub fun main(): {UInt32 : BigDaddyMarketplaceContract.Template} {

    return BigDaddyMarketplaceContract.listTemplates()
  
}`;