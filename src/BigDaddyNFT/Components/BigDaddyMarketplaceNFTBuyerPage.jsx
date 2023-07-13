import React, { useState, useEffect } from 'react';
import '../BigDaddyMarketplaceCSS.css';

function BigDaddyMarketplaceNFTBuyerPage({
  handleLogOut,
  redirectToMarketplace,
  nftList,
  fusdBalance,
  user,
  needRefresh,
  finishRefresh,
  handledeployBigDaddyMarketplaceNFT
}) {

  const [selectedNft, setSelectedNft] = useState(null);
  const [BigDaddyMarketplaceNftList, setBigDaddyMarketplaceNftList] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [siteId, setSiteId] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    if (nftList) {
      setBigDaddyMarketplaceNftList(nftList);
    }

    if (needRefresh) {
      setBigDaddyMarketplaceNftList(nftList);
      finishRefresh();
      setSelectedNft(null);
    }
  }, [nftList, needRefresh]);


  return (
    <div className="BigDaddyMarketplaceContainer">
      <img src={"/bigdaddymarketplace/logo-4.png"} width={"300px"} height={"150px"} />

      <div className="BigDaddyMarketplaceuserProfile">
        <p>Address: {user?.addr}</p>
        <p>FUSD Balance: {fusdBalance}</p>
        <button onClick={handleLogOut} className="glow-on-hover logout">Log Out</button>
      </div>

      <button onClick={redirectToMarketplace} className="glow-on-hover logout">Go to Marketplace</button>

      <h1>My Website NFTs</h1>

      <div className="contentContainer">
        <div className="BigDaddyMarketplacecolumn left">
          <div className={"nft-item selected"}>My personnal NFTs</div>
          {BigDaddyMarketplaceNftList.map(nft => (
            <div
              key={nft.nftId}
              onClick={() => {
                setSelectedNft(nft);
                setTitle(nft.websiteTitle);
                setDescription(nft.websiteDescription);
                setWebsiteUrl('http://bigdaddywebsites.app.bigdaddy-nft.com/'+user.addr.toString()+nft.nftId.toString());
              }}
              className={`nft-item ${selectedNft === nft ? "selected" : ""}`}
            >
              {"#" + nft.nftId.toString()}
            </div>
          ))}
        </div>
        <div className="BigDaddyMarketplacecolumn">
          <div className="helpCard">
            <img src="/logo-4.png" alt="NFT" className="cardContent" />
          </div>
        </div>
        <div className="BigDaddyMarketplacecolumn right">
          <div>
            {(selectedNft !== null) ? (
              <><h2>NFT Details</h2><div>
                <p>NFT ID: {selectedNft.nftId}</p>
                <label className="bigdaddy-label">
                  Website Title:
                  <input type="text" value={title} disabled={selectedNft.isDeployed} onChange={e => setTitle(e.target.value)} className="bigdaddy-input" />
                </label>
                <label className="bigdaddy-label">
                  Website Description:
                  <textarea value={description} disabled={selectedNft.isDeployed} onChange={e => setDescription(e.target.value)} className="bigdaddy-input" />
                </label>

                {(selectedNft.isDeployed) ? (
                  <label className="bigdaddy-label">
                    Website URL:
                    <input type="text" value={websiteUrl} disabled="true" className="bigdaddy-input" />
                  </label>
                ) : (
                  <>
                    <label className="bigdaddy-label">
                      BigDaddy SiteId:
                      <input type="text" value={siteId} onChange={e => setSiteId(e.target.value)} className="bigdaddy-input" />
                    </label>
                    <button className="glow-on-hover" onClick={() => { handledeployBigDaddyMarketplaceNFT(selectedNft.nftId, title, description, siteId, selectedNft.projectID) }}>Deploy</button>
                  </>
                )}
              </div></>
            ) : () => { }}
          </div>

        </div>
      </div>
    </div>
  );
}

export default BigDaddyMarketplaceNFTBuyerPage;
