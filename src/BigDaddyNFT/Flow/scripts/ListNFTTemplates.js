export const LIST_NFT_TEMPLATES_SCRIPT = `import BigDaddyMarketplaceContract from 0x4a3113da5c8e65f6

pub fun main(): {UInt32 : BigDaddyMarketplaceContract.Template} {

    return BigDaddyMarketplaceContract.listTemplates()
  
}`;