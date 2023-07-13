export const HAS_BIGDADDYMARKETPLACE_COLLECTION_SCRIPT = `import BigDaddyMarketplaceContract from 0x4a3113da5c8e65f6

pub fun main(addr: Address): Bool {
    
   if let myref = getAccount(addr).getCapability(BigDaddyMarketplaceContract.NFTMarketplaceCollectionPublicPath).borrow<&{BigDaddyMarketplaceContract.CollectionPublic}>()
   {
    return true
   }
   
   return false
        
}`;