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

  const [collectionName, setCollectionName] = useState("");
  const [price, setPrice] = useState(0.00);
  const [selectedNft, setSelectedNft] = useState(null);
  const [selectedSaleNft, setSelectedSaleNft] = useState(null);
  const [sellPrice, setSellPrice] = useState(0.00);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [limit, setLimit] = useState(0);
  const [BigDaddyMarketplaceSaleList, setBigDaddyMarketplaceSaleList] = useState({})
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

      {hasPersonnalAccess && <button onClick={redirectAfterAuth} className="glow-on-hover logout">Go to my private Website</button>}
      {isCreator && <button onClick={redirectCreatorAfterAuth} className="glow-on-hover logout">Go to my creator Page</button>}

      <h1>{collectionName}</h1>

      <div className="contentContainer">
      <div className="BigDaddyMarketplacecolumn left">
      <div className={"nft-item selected"}>My personnal NFTs</div>
        {BigDaddyMarketplaceNftList.map(nft => (
          <div
            key={nft}
            onClick={() => setSelectedNft(nft)}
            className={`nft-item ${selectedNft === nft ? "selected" : ""}`}
          >
            {"#"+nft.toString()+"/"+limit.toString()}
          </div>
        ))}
    </div>
    {selectedNft && isLimitReached &&(
          <div className="BigDaddyMarketplace-left-table-footer">
            <label className="BigDaddyMarketplace-label">
              Price (in FUSD): <input type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} min={0} className="BigDaddyMarketplace-input" style={{width: "100 px"}}/>
            </label>
            <button onClick={() => handleSellNFT(selectedNft, sellPrice)} className="glow-on-hover">Sell NFT</button>
          </div>
        )}
        
        <div className="BigDaddyMarketplacecolumn">
          <div className="helpCard">
            <img src={nftImagePath} alt="NFT" className="cardContent" />
          </div>
        </div>
        {isLimitReached && (
        <div className="BigDaddyMarketplacecolumn right">
        <div className={"nft-item selected"}>Buy NFT</div>
          {isLimitReached &&
            Object.entries(BigDaddyMarketplaceSaleList).map(([id, price]) => (
              <div
                key={id}
                onClick={() => setSelectedSaleNft(id)}
                className={`nft-item ${selectedSaleNft === id ? "selected" : ""}`}
              >
                #{id}/{limit} : {price} FUSD
              </div>
              ))}
          
        </div>)}
        {isLimitReached && selectedSaleNft && (
          <div className="BigDaddyMarketplace-right-table-footer">
            <button onClick={() => handleBuySecondHandNFT(selectedSaleNft)} className="glow-on-hover">Buy NFT</button>
          </div>
          )}
          {!isLimitReached && (
            <button onClick={() => handleBuyNFT()} className="glow-on-hover" >Buy ${price} FUSD</button>
          )}
      </div>
    </div>
  );
}

export default BigDaddyMarketplaceNFTBuyerPage;
