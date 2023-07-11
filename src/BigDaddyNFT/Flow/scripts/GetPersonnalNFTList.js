export const GET_PERSONNAL_NFT_LIST_SCRIPT = `import BigDaddyMarketplaceContract from 0x03
pub fun main(address: Address): [BigDaddyMarketplaceContract.UserNFTTemplate]? {
  let account = getAccount(address)

  let ref = account.getCapability<&{BigDaddyMarketplaceContract.CollectionPublic}>(BigDaddyMarketplaceContract.NFTMarketplaceCollectionPublicPath).borrow()
  
   if let userRef = ref {
    return userRef.getNFTs()
  } else {
    return nil
  }
}
`;