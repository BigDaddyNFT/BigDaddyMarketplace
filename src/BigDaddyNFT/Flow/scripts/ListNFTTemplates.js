export const LIST_NFT_TEMPLATES_SCRIPT = `import BigDaddyMarketplaceContract from 0xd75dc7fd8d3cd8f4

pub fun main(): {UInt32 : BigDaddyMarketplaceContract.Template} {

    return BigDaddyMarketplaceContract.listTemplates()
  
}`;