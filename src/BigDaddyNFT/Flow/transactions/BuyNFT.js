export const BUY_NFT_TX = `import BigDaddyMarketplaceContract from 0xd75dc7fd8d3cd8f4

transaction(templateId: UInt32) {
  let receiverReference: &BigDaddyMarketplaceContract.Collection{BigDaddyMarketplaceContract.Receiver}
  let buyer: AuthAccount

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&BigDaddyMarketplaceContract.Collection{BigDaddyMarketplaceContract.Receiver}>(from: BigDaddyMarketplaceContract.NFTMarketplaceCollectionStoragePath) 
        ?? panic("Cannot borrow")
      self.buyer = acct
  }

  execute {
    let newNFT <- BigDaddyMarketplaceContract.buyBigDaddyMarketplaceNFT(templateID: templateId, buyer: self.buyer)
    if newNFT == nil {
        panic("Could not buy the NFT")
   }
      self.receiverReference.deposit(token: <- newNFT!)
  }
}`;