import * as fcl from "@onflow/fcl"

// Importez vos scripts Cadence
import { HAS_BIGDADDYMARKETPLACE_COLLECTION_SCRIPT } from "./scripts/HasBigDaddyMarketplaceCollection"
import { LIST_NFT_TEMPLATES_SCRIPT } from "./scripts/GetTemplatebySite"
import { GET_PERSONNAL_NFT_LIST_SCRIPT } from "./scripts/GetPersonnalNFTList"
import { GET_FUSD_BALANCE } from "./scripts/GetFUSDBalance"

// import { YOUR_SECOND_SCRIPT } from './path_to_your_second_script'
// import { YOUR_THIRD_SCRIPT } from './path_to_your_third_script'

class BigDaddyMarketplaceScripts {

  async executeScript(cadenceCode, args = []) {
    const response = await fcl.send([
      fcl.script(cadenceCode),
      args,
    ])

    return fcl.decode(response)
  }

  async getTemplatebySiteId(siteId) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_TEMPLATE_BY_SITE_SCRIPT, args)
  }

  async hasBigDaddyMarketplaceCollection(addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address)
    ])
    return this.executeScript(HAS_BigDaddyMarketplace_COLLECTION_SCRIPT, args)
  }

  async getFUSDBalance(addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address)
    ])
    return this.executeScript(GET_FUSD_BALANCE, args)
  }

  async getPersonnalBigDaddyMarketplaceNFTList(siteId, addr) {
    let args = fcl.args([
      fcl.arg(addr, fcl.t.Address),
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_PERSONNAL_NFT_LIST_SCRIPT, args)
  }

  async getBigDaddyMarketplaceSaleList(siteId) {
    let args = fcl.args([
      fcl.arg(siteId, fcl.t.String)
    ])
    return this.executeScript(GET_SALE_LIST_SCRIPT, args)
  }

}

export default BigDaddyMarketplaceScripts
