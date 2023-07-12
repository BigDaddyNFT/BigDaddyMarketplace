export const DEPLOY_NFT_TX = `import BigDaddyMarketplaceContract from 0xd75dc7fd8d3cd8f4

transaction(nftId: UInt64, websiteTitle: String, websiteDescription: String, siteId: String) {
  let deployerReference: &BigDaddyMarketplaceContract.Collection{BigDaddyMarketplaceContract.CollectionPublic}

  prepare(acct: AuthAccount) {
    self.deployerReference = acct.borrow<&BigDaddyMarketplaceContract.Collection{BigDaddyMarketplaceContract.CollectionPublic}>(from: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath) 
        ?? panic("Cannot borrow")
  }

  execute {
    self.deployerReference.deployBigDaddyMarketplaceNFT(nftId: nftId, websiteTitle: websiteTitle, websiteDescription: websiteDescription, siteId: siteId)
  }
}`;