import * as fcl from "@onflow/fcl"

// Importez vos transactions Cadence
import { ENABLE_BIGDADDYMARKETPLACE_COLLECTION_TX } from './transactions/EnableBigDaddyMarketplaceCollection'
import { BUY_NFT_TX } from "./transactions/BuyNFT"
import { DEPLOY_NFT_TX } from "./transactions/DeployNFT"

class BigDaddyMarketplaceTransactions {

  async sendTransaction(cadenceCode, args) {
    const response = await fcl.send([
      fcl.transaction(cadenceCode),
      args,
      fcl.proposer(fcl.currentUser().authorization),
      fcl.payer(fcl.currentUser().authorization),
      fcl.limit(9999),
      fcl.authorizations([               // add this
        fcl.currentUser().authorization  // add this
      ]),
    ])

    const transactionId = await fcl.decode(response)

    await fcl.tx(transactionId).onceSealed()

    return transactionId
  }

  // Créez des fonctions distinctes pour chaque transaction
  async enableBigDaddyMarketplaceCollection() {
    let args = fcl.args([])
    return this.sendTransaction(ENABLE_BIGDADDYMARKETPLACE_COLLECTION_TX, args)
  }

  async buyBigDaddyMarketplaceNFT(templateId) {
    let args = fcl.args([
      fcl.arg(templateId, fcl.t.UInt32)
    ])
    return this.sendTransaction(BUY_NFT_TX, args)
  }

  async deployBigDaddyMarketplaceNFT(nftId, websiteTitle, websiteDescription, siteId) {
    let args = fcl.args([
      fcl.arg(nftId, fcl.t.UInt64),
      fcl.arg(websiteTitle, fcl.t.String),
      fcl.arg(websiteDescription, fcl.t.String),
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.sendTransaction(DEPLOY_NFT_TX, args)
  }

}

export default BigDaddyMarketplaceTransactions
