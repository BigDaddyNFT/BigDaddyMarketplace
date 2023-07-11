// Importation des contrats nécessaires
import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68


// Declaration of the main contract
pub contract BigDaddyMarketplaceContract {
    // Private variables
    access(self) var templates: {UInt32: Template}
    access(self) var nextTemplateID: UInt32
    access(self) var BigDaddyMarketplaceAuthorisation: {UInt64: String}
    access(self) var totalBigDaddyMarketplaceNFTs: UInt64
    access(self) var totalSecondHandSales: UInt64
    access(self) var market: {UInt64 : SaleItem}

    // Public constants
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterCollectionPublicPath: PublicPath
    pub let ReceiverPublicPath: PublicPath
    pub let ProviderPublicPath: PublicPath

    pub struct SaleItem {
      pub var price: UFix64
      pub var sellerAddress: Address
      pub var templateNumber: UInt32
      pub var siteId: String

      init(price: UFix64, sellerAddress: Address, templateNumber: UInt32, siteId: String)
      {
      self.price = price;
      self.sellerAddress = sellerAddress;
      self.templateNumber = templateNumber;
      self.siteId = siteId;
      }
    }


    // Definition of the Template structure
    pub struct Template {
        pub let templateID: UInt32
        pub let name: String
        pub let price: UFix64
        pub let limit: UInt32
        pub(set) var minted: UInt32
        access(contract) let templateKey: String
        pub let creator: Address
        pub let royalties: UFix64

        // Template initialization
        init(templateID: UInt32, name: String, price: UFix64, limit: UInt32, creator: AuthAccount, royalties: UInt8) {
            self.templateID = templateID
            self.name = name
            self.price = price
            self.creator = creator.address
            self.limit = limit
            self.minted = 0
            self.royalties = UFix64(royalties) / 100.0
            self.templateKey = self._calculateTemplateKey()
        }

        // Function to calculate the template key
        access(self) fun _calculateTemplateKey(): String {
            let templateKey = HashAlgorithm.SHA2_256.hashWithTag(self.name.utf8, tag: self.templateID.toString())

            // Convert byte array into hexadecimal string
            let templateKeyString = String.encodeHex(templateKey)

            // Check if the generated templateKey already exists
            for key in BigDaddyMarketplaceContract.templates.keys {
                if (BigDaddyMarketplaceContract.templates[key]?.templateKey == templateKeyString) {
                    panic ("Sorry you have to change your NFT collection name.")
                }
            } 

            return templateKeyString
        }

        access(contract) fun mintNFT() {
        if (self.minted == self.limit){
        panic("Too many NFT have all ready been minted")
        }
        else {
        self.minted = self.minted + 1
        }
        }
    }

    // BigDaddyMarketplaceNFT resource
    pub resource BigDaddyMarketplaceNFT {
        access(contract) let id: UInt64
        pub let templateNumber: UInt32
        pub let data: Template

        // Initialization of BigDaddyMarketplaceNFT
        init(templateID: UInt32) {
            pre {
                BigDaddyMarketplaceContract.templates[templateID] != nil : "Could not create BigDaddyMarketplaceNFT: template does not exist."
            }
            BigDaddyMarketplaceContract.templates[templateID]?.mintNFT()
            let BigDaddyMarketplaceNFTTemplate = BigDaddyMarketplaceContract.templates[templateID]!
            BigDaddyMarketplaceContract.totalBigDaddyMarketplaceNFTs = BigDaddyMarketplaceContract.totalBigDaddyMarketplaceNFTs + 1
            self.id = BigDaddyMarketplaceContract.totalBigDaddyMarketplaceNFTs
            self.templateNumber = BigDaddyMarketplaceNFTTemplate.minted
            self.data = BigDaddyMarketplaceNFTTemplate
            self.addKeyValuePair(templateKey: self.data.templateKey, nftId: self.id)
        }

        // Function to add a key pair to the contract
        access(self) fun addKeyValuePair(templateKey: String, nftId: UInt64) {
            // Check if the key already exists
            if BigDaddyMarketplaceContract.BigDaddyMarketplaceAuthorisation[nftId] == nil {
                // If it doesn't exist, add the pair to the dictionary
                BigDaddyMarketplaceContract.BigDaddyMarketplaceAuthorisation[nftId] = templateKey
            } else {
                // Otherwise, display an error message or handle as you wish
                panic("NFT ID already exists in the dictionary.")
            }
        }
    }

// MinterCollectionPublic is an interface for users or contracts that can create (or "mint") new NFTs.
  pub resource interface MinterCollectionPublic {
      // mintBigDaddyMarketplaceNFTNewTemplate creates new NFTs from a new template.
      // The template is defined by its name, price, and the address of the account that created it (minter).
      // The quantity of NFTs to be created from this template is also specified.
      pub fun createBigDaddyMarketplaceNFTTemplate(name: String, price: UFix64, quantity: UInt32, minter: AuthAccount, royalties: UInt8)
  }

  // CollectionPublic is an interface for users or contracts that can read personal access information from the collection.
  pub resource interface CollectionPublic {
      // getPersonalAccess checks if a user has access to a specific site based on its site ID.
      // It returns a boolean that is true if the user has access to the site, and false otherwise.
      pub fun getPersonalAccess(siteID: String): Bool

      pub fun getNFTsBySiteID(siteID: String): [UInt32]

    //  pub fun verifyNFTownership(siteID: String, templateNumber: UInt32, seller: AuthAccount) : Bool
  }

  // Receiver is an interface for users or contracts that can deposit NFTs into the collection.
  pub resource interface Receiver {
      // deposit takes an NFT and deposits it into the collection.
      pub fun deposit(token: @BigDaddyMarketplaceNFT)
  }

  // Receiver is an interface for users or contracts that can deposit NFTs into the collection.
  pub resource interface Provider {
      // deposit takes an NFT and deposits it into the collection.
      pub fun withdraw(siteID: String, templateNumber: UInt32) : @BigDaddyMarketplaceNFT? 
  }

  // The Collection resource implements the MinterCollectionPublic, CollectionPublic and Receiver interfaces.
  pub resource Collection: CollectionPublic, Receiver, Provider, MinterCollectionPublic {
    access(self) var ownedBigDaddyMarketplaceNFTs: @{UInt64: BigDaddyMarketplaceNFT}

    // mintBigDaddyMarketplaceNFTNewTemplate creates new NFTs from a new template.
    pub fun createBigDaddyMarketplaceNFTTemplate(name: String, price: UFix64, quantity: UInt32, minter: AuthAccount, royalties : UInt8) {

      for key in BigDaddyMarketplaceContract.templates.keys {
        if (BigDaddyMarketplaceContract.templates[key]?.creator == minter.address) {
        panic ("User already have a SiteID")
        }
      } 
       
      let newTemplateID = BigDaddyMarketplaceContract.nextTemplateID
      BigDaddyMarketplaceContract.templates[newTemplateID] = Template(templateID: newTemplateID, name: name, price: price, limit: quantity,creator: minter, royalties: royalties)
      BigDaddyMarketplaceContract.nextTemplateID = BigDaddyMarketplaceContract.nextTemplateID + 1
    }

    // The destroy function releases resources owned by this contract.
    destroy() {
      destroy self.ownedBigDaddyMarketplaceNFTs
    }

    // deposit takes an NFT and deposits it into the collection.
    pub fun deposit(token: @BigDaddyMarketplaceNFT) {
      // Check if a token with the same ID already exists.
      if (self.ownedBigDaddyMarketplaceNFTs[token.id] != nil) {
        panic("A token with this ID already exists!")
      }

      // If not, add the new token.
      self.ownedBigDaddyMarketplaceNFTs[token.id] <-! token
    }

        // deposit takes an NFT and deposits it into the collection.
// withdraw takes a siteID and a templateNumber and removes the corresponding NFT from the collection.
pub fun withdraw(siteID: String, templateNumber: UInt32) : @BigDaddyMarketplaceNFT? {
    // Check if a token with the same siteID and templateNumber exists.
    for key in self.ownedBigDaddyMarketplaceNFTs.keys {
        if (self.ownedBigDaddyMarketplaceNFTs[key]?.templateNumber == templateNumber && self.ownedBigDaddyMarketplaceNFTs[key]?.data?.templateKey == siteID) {
            // Unstake the NFT and return it
            return <- self.ownedBigDaddyMarketplaceNFTs.remove(key: key)
        }
    }

    // If no matching NFT is found, return nil
    return nil
}


pub fun getNFTsBySiteID(siteID: String): [UInt32] {
    // Try to retrieve the template using the siteID
    let template = BigDaddyMarketplaceContract.getTemplate(siteID: siteID)
                                    ?? panic("Could not find a template with the provided siteID")

    // Prepare an empty array to hold the template numbers
    var templateNumbers: [UInt32] = []

    // Iterate over the owned NFTs
    for key in self.ownedBigDaddyMarketplaceNFTs.keys {
        // If the NFT's template key matches the template key of the provided siteID
        if self.ownedBigDaddyMarketplaceNFTs[key]?.data?.templateID == template.templateID {
            // Append the NFT's template number to the list
            templateNumbers.append(self.ownedBigDaddyMarketplaceNFTs[key]?.templateNumber ?? panic("logical problem"))
        }
    }
    // Return the list of template numbers
    return templateNumbers
}


    //  pub fun verifyNFTownership(siteID: String, templateNumber: UInt32, seller: AuthAccount) : Bool{
    //  var isOwner = false;

    //  for key in self.ownedBigDaddyMarketplaceNFTs.keys {
    //    if (self.ownedBigDaddyMarketplaceNFTs[key]?.templateNumber == templateNumber && self.ownedBigDaddyMarketplaceNFTs[key]?.data?.templateKey == siteID && self.ownedBigDaddyMarketplaceNFTs[key]?.data?.creator == seller.address){
    //    isOwner = true
    //  }
    //  }
    //  return isOwner
    //  }

    // getPersonalAccess checks if a user has access to a specific site based on its site ID.
    pub fun getPersonalAccess(siteID: String): Bool {
      var myUserKeys : [UInt64] = []
      
      for key in self.ownedBigDaddyMarketplaceNFTs.keys {
        let nftKey = self.ownedBigDaddyMarketplaceNFTs[key]?.id ?? panic("No Big DaddyNFT! Sorry!")
        myUserKeys.append(nftKey)
      }

      var isValidate = false;

      // Go through all the keys in myUserKeys
      for userKey in myUserKeys {
        // Check if the key exists in BigDaddyMarketplaceAuthorisation
        if let templateKey = BigDaddyMarketplaceContract.BigDaddyMarketplaceAuthorisation[userKey] {
            // If yes, check if the templateKey is equal to siteID
            if templateKey == siteID {
                isValidate = true
                // If the condition is met, we can break the loop
                break
            }
        }
      }

      return isValidate
    }

    // The init function is a constructor that initializes the state of the contract.
    init() {
      self.ownedBigDaddyMarketplaceNFTs <- {}
    }
  }

  // createEmptyCollection creates a new collection and returns it.
  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }

  priv fun payInFUSD(payer: Address, receiver: Address, amount: UFix64){
        // Get the accounts
      let receiverAcct = getAccount(receiver)
      let payerAcct = getAccount(payer)

      // Create the payment reference for the creator's account
      let receiverPaymentReceiverRef = receiverAcct.getCapability(/public/fusdReceiver)
                                                    .borrow<&FUSD.Vault{FungibleToken.Receiver}>()
                                                    ?? panic("Could not borrow payment receiver reference from the creator")

      let vaultRef = payerAcct.getCapability(/public/fusdBalance).borrow<&FUSD.Vault{FungibleToken.Balance}>() ?? panic("Could not borrow FUSD vault Balance")
      let providerRef = payerAcct.getCapability(/public/fusdProvider).borrow<&FUSD.Vault{FungibleToken.Provider}>() ?? panic("Could not borrow FUSD vault")

      // Ensure the payment is sufficient for the NFT
      assert(
        vaultRef.balance >= amount,
        message: "Insufficient funds for purchasing this NFT"
      )

      // Transfer the funds to the creator
      receiverPaymentReceiverRef.deposit(from: <-providerRef.withdraw(amount: amount))
  }


  // buyBigDaddyMarketplaceNFT allows a user to purchase an NFT.
  pub fun buyBigDaddyMarketplaceNFT(siteID: String, buyer: AuthAccount): @BigDaddyMarketplaceNFT? {

    let template = self.getTemplate(siteID: siteID) ?? panic ("Did not found NFT to buy")

    let newNFT <- create BigDaddyMarketplaceNFT(templateID: template.templateID)

    if (template.price != 0.0) {
      self.payInFUSD(payer: buyer.address, receiver: template.creator, amount: template.price)
    }

    // Return the NFT
    return <-newNFT
  }

  pub fun buyNFTSecondHand(buyerAccount: AuthAccount, siteID: String, templateNumber: UInt32) {
    var isNFTtoSale = false
    var sellerAdress : Address? = nil
    var price :UFix64 = 0.0
    var royalties :UFix64 = 0.0

    self.market.forEachKey(fun (key: UInt64) : Bool{
        if (self.market[key]?.siteId == siteID && self.market[key]?.templateNumber == templateNumber){
        isNFTtoSale = true;
        sellerAdress = self.market[key]?.sellerAddress
        price = self.market[key]?.price ?? panic("error")
        return false;
        }
        else {
          return true;
        }
  })

     if (!isNFTtoSale){ panic("No NFT listed for sale with the provided siteID and templateNumber")}

     let template = self.getTemplate(siteID: siteID)
     royalties = template?.royalties ?? panic("error")
      let sellerAddress = sellerAdress ?? panic("error cannot find sellerAddress")
    
    let sellerCollectionRef = getAccount(sellerAddress).getCapability(/public/BigDaddyMarketplaceNFTProviderPublic)
                              .borrow<&{BigDaddyMarketplaceContract.Provider}>()
                              ?? panic("Could not borrow a reference to the seller's NFT collection")

    let buyerCollectionRef = buyerAccount.borrow<&Collection>(from: /storage/BigDaddyMarketplaceNFTCollection)
                             ?? panic("Could not borrow a reference to the buyer's NFT collection")


    if (royalties != 0.0 ){ 
      self.payInFUSD(payer: buyerAccount.address, receiver: sellerAddress, amount: price * (1.0 - royalties))
      self.payInFUSD(payer: buyerAccount.address, receiver: template?.creator ?? panic("no creator"), amount: price * royalties)
    } 
    else{
      self.payInFUSD(payer: buyerAccount.address, receiver: sellerAddress, amount: price)
    }
   
    let nft <- sellerCollectionRef.withdraw(siteID: siteID, templateNumber: templateNumber)
    
    buyerCollectionRef.deposit(token: <- nft!)

    // Remove the NFT from the market
    self.removeNFTFromSellList(account : sellerAddress, siteID : siteID, templateNumber: templateNumber)
}

  // getTemplatebyCreatorAdress retrieves a template using the creator's address.
  pub fun getTemplatebyCreatorAdress(creator: Address): Template? {
    for key in BigDaddyMarketplaceContract.templates.keys {
        if (BigDaddyMarketplaceContract.templates[key]?.creator == creator) {
        return BigDaddyMarketplaceContract.templates[key]
        }
      } 
     return nil 
  }

  // getTemplate retrieves a template using the site ID.
  pub fun getTemplate(siteID: String):  Template? {
  
    // Go through the templates and return the matching template
      for key in self.templates.keys {
        if (self.templates[key]?.templateKey == siteID) {
          return self.templates[key]
        }
      }

    // If no template matches, return nil
    return nil
  }

  pub fun sellNFT(account: AuthAccount, siteID: String, templateNumber: UInt32, price: UFix64) { 
    self.totalSecondHandSales = self.totalSecondHandSales + 1
    self.market[self.totalSecondHandSales] = SaleItem(price: price, sellerAddress: account.address, templateNumber: templateNumber, siteId: siteID)
  }

  pub fun listNFTsToSell(siteID: String): {UInt32: UFix64?} {
    var itemsForSale: {UInt32: UFix64} = {}
    
    for key in self.market.keys {
      let sale = self.market[key] ?? panic("error")
        if (sale.siteId == siteID) {
            itemsForSale[sale.templateNumber] = sale.price
        }
    }
    
    return itemsForSale
  }

  pub fun removeNFTFromSellList(account: Address, siteID: String, templateNumber: UInt32) {
    for key in self.market.keys {
        let sale = self.market[key] ?? panic("error")
        if (sale.siteId == siteID && sale.templateNumber == templateNumber) {
             if sale.sellerAddress != account {
                 panic("This NFT is not listed for sale by this account")
              }
              else{
              self.market.remove(key: key);
              }
        }
    }
}

  // The init function is a constructor that initializes the state of the contract.
  init() {
    self.templates = {}
    self.totalBigDaddyMarketplaceNFTs = 0
    self.totalSecondHandSales = 0
    self.nextTemplateID = 1
    self.BigDaddyMarketplaceAuthorisation = {}
    self.market = {}
    self.CollectionStoragePath = /storage/BigDaddyMarketplaceNFTCollection
    self.CollectionPublicPath = /public/BigDaddyMarketplaceNFTCollectionPublic
    self.MinterCollectionPublicPath = /public/BigDaddyMarketplaceNFTMinterCollectionPublic
    self.ReceiverPublicPath = /public/BigDaddyMarketplaceNFTReceiverPublic
    self.ProviderPublicPath = /public/BigDaddyMarketplaceNFTProviderPublic
  }
}