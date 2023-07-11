import * as fcl from "@onflow/fcl"

// Importez vos transactions Cadence
import { ENABLE_BigDaddyMarketplace_COLLECTION_TX } from './transactions/EnableBigDaddyMarketplaceCollection'
import { BUY_NFT_TX } from "./transactions/BuyNFT"
import { BUY_2ND_Hand_NFT_TX } from "./transactions/DeployNFT"
import { SELL_BIG_DADDY_NFT_TX } from "./transactions/SellNFT"

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
    return this.sendTransaction(ENABLE_BigDaddyMarketplace_COLLECTION_TX, args)
  }

  async buyBigDaddyMarketplaceNFT(siteId) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.sendTransaction(BUY_NFT_TX, args)
  }

  async sellBigDaddyMarketplaceNFT(siteId, sellTemplateNumber, sellPrice) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String),
      fcl.arg(sellTemplateNumber, fcl.t.UInt32),
      fcl.arg(sellPrice, fcl.t.UFix64)
    ])
    return this.sendTransaction(SELL_BIG_DADDY_NFT_TX, args)
  }

  async buySecondHandBigDaddyMarketplaceNFT(siteId, templateNumber) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String),
      fcl.arg(templateNumber, fcl.t.UInt32)
    ])
    return this.sendTransaction(BUY_2ND_Hand_NFT_TX, args)
  }

}

export default BigDaddyMarketplaceTransactions
