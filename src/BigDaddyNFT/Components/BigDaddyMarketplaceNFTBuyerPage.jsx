import React, { useState, useEffect } from 'react';
import '../BigDaddyMarketplaceCSS.css';

function BigDaddyMarketplaceNFTBuyerPage({
  handleBuyNFT,
  nftTemplate,
  handleLogOut,
  hasPersonnalAccess, 
  redirectAfterAuth,
  nftImagePath,
  nftList,
  saleList,
  fusdBalance,
  handleSellNFT,
  handleBuySecondHandNFT,
  user,
  needRefresh,
  finishRefresh,
  isCreator,
  redirectCreatorAfterAuth
}) {

  const [selectedNft, setSelectedNft] = useState(null);
  const [BigDaddyMarketplaceNftList, setBigDaddyMarketplaceNftList] = useState([])

  useEffect(() => {
    if (nftTemplate) {
      setCollectionName(nftTemplate.name);
      setPrice(nftTemplate.price);
      setLimit(nftTemplate.limit);
      setIsLimitReached(nftTemplate.minted === nftTemplate.limit);
      setBigDaddyMarketplaceSaleList(saleList);
      let saleIds = new Set(Object.keys(BigDaddyMarketplaceSaleList).map(Number));
      let unsoldNfts = [];
      for (let nft of nftList) {
        if (!saleIds.has(Number(nft))) {
          unsoldNfts.push(nft);
        }
      }
      setBigDaddyMarketplaceNftList(unsoldNfts);
    }

    if(needRefresh){
      setBigDaddyMarketplaceSaleList(saleList);
      let saleIds = new Set(Object.keys(BigDaddyMarketplaceSaleList).map(Number));
      let unsoldNfts = [];
      for (let nft of nftList) {
        if (!saleIds.has(nft)) {
          unsoldNfts.push(nft);
        }
      }
      setBigDaddyMarketplaceNftList(unsoldNfts);
      finishRefresh();
      setSelectedNft(null);
      setSelectedSaleNft(null);
  }
  }, [nftTemplate, nftList, saleList, needRefresh]);


  return (
    <div className="BigDaddyMarketplaceContainer">
      <img src={"/BigDaddyMarketplace-logo-quart.png"} width={"300px"} height={"150px"}/>

      <div className="BigDaddyMarketplaceuserProfile">
        <p>Address: {user?.addr}</p>
        <p>FUSD Balance: {fusdBalance}</p>
        <button onClick={handleLogOut} className="glow-on-hover logout">Log Out</button>
      </div>

      <button onClick={redirectAfterAuth} className="glow-on-hover logout">Go to Marketplace</button>

      <h1>{collectionName}</h1>

      <div className="contentContainer">
      <div className="BigDaddyMarketplacecolumn left">
      <div className={"nft-item selected"}>My personnal NFTs</div>
        {BigDaddyMarketplaceNftList.map(nft => (
          <div
            key={nft.nftId}
            onClick={() => {
              setSelectedNft(nft);
              setIsEditable(!nft.isDeployed);
            }}
            className={`nft-item ${selectedNft === nft ? "selected" : ""}`}
          >
            {"#"+nft.nftId.toString()}
          </div>
        ))}  
    </div>       
        <div className="BigDaddyMarketplacecolumn">
          <div className="helpCard">
            <img src={nftImagePath} alt="NFT" className="cardContent" />
          </div>
        </div>
        <div className="BigDaddyMarketplacecolumn right">
        <div>
          <h2>NFT Details</h2>
          {isEditable ? (
            <div>
              <p>NFT ID: {selectedNft.nftId}</p>
              <label className="bigdaddy-label">
              Website Title:
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="bigdaddy-input" />
              </label>
              <label className="bigdaddy-label">
              Website Description:
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="bigdaddy-input" />
             </label>
              <button onClick={handleDeploy}>Deploy</button>
            </div>
          ) : (
            <div>
              
          <p>NFT ID: {selectedNft.nftId}</p>
          <p>Website Title: {selectedNft.websiteTitle}</p>
          <p>Website Description: {selectedNft.websiteDescription}</p>

            </div>
          )}
        </div>
       
      </div>
    </div>
    </div>
  );
}

export default BigDaddyMarketplaceNFTBuyerPage;
