export const HAS_BIGDADDYMARKETPLACE_COLLECTION_SCRIPT = `import BigDaddyMarketplaceContract from 0xd75dc7fd8d3cd8f4

pub fun main(addr: Address): Bool {
    
   if let myref = getAccount(addr).getCapability(BigDaddyMarketplaceContract.NFTMarketplaceCollectionPublicPath).borrow<&{BigDaddyMarketplaceContract.CollectionPublic}>()
   {
    return true
   }
   
   return false
        
}`;