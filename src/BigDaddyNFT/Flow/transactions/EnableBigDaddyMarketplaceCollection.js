export const ENABLE_BIGDADDYMARKETPLACE_COLLECTION_TX = `import BigDaddyMarketplaceContract from 0x4a3113da5c8e65f6
import FUSD from 0xe223d8a629e49c68
import FungibleToken from 0x9a0766d93b6608b7

transaction {
  prepare(acct: AuthAccount) {

    if(acct.borrow<&BigDaddyMarketplaceContract.Collection>(from: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath) != nil) {
      return 
    }

    let collection <- BigDaddyMarketplaceContract.createEmptyCollection()
    acct.save<@BigDaddyMarketplaceContract.Collection>(<-collection, to: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath)
    acct.link<&{BigDaddyMarketplaceContract.CollectionPublic}>(BigDaddyMarketplaceContract.NFTMarketplaceCollectionPublicPath, target: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath)
    acct.link<&{BigDaddyMarketplaceContract.MinterCollectionPublic}>(BigDaddyMarketplaceContract.NFTMarketplaceMinterCollectionPublicPath, target: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath)
    acct.link<&{BigDaddyMarketplaceContract.Receiver}>(BigDaddyMarketplaceContract.NFTMarketplaceReceiverPublicPath, target: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath)
    acct.link<&{BigDaddyMarketplaceContract.Provider}>(BigDaddyMarketplaceContract.NFTMarketplaceProviderPublicPath, target: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath)
    
    if(acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
      return
    }
  
    acct.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

    acct.link<&FUSD.Vault{FungibleToken.Receiver}>(
      /public/fusdReceiver,
      target: /storage/fusdVault
    )

    acct.link<&FUSD.Vault{FungibleToken.Balance}>(
      /public/fusdBalance,
      target: /storage/fusdVault
    )

    acct.link<&FUSD.Vault{FungibleToken.Provider}>(
      /public/fusdProvider,
      target: /storage/fusdVault
    )

  }
}`;