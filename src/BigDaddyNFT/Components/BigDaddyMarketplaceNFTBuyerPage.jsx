import React, { useState, useEffect } from 'react';
import '../BigDaddyMarketplaceCSS.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CCard, CCardBody, CCardHeader, CFormInput, CFormLabel, CCol, CRow, CFormTextarea } from '@coreui/react';

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
    <div>

      <h1 style={{ textAlign: 'center', margin: '20px 0px 40px 0px' }}>My Website NFTs</h1>

      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }} className='m-5'>
        <CCol xs>
          <CCard className="h-100 mb-3 border-info">
            <CCardHeader>My personnal NFTs</CCardHeader>
            <CCardBody>
              {BigDaddyMarketplaceNftList.map(nft => (
                <div
                  key={nft.nftId}
                  onClick={() => {
                    setSelectedNft(nft);
                    setTitle(nft.websiteTitle);
                    setDescription(nft.websiteDescription);
                    setWebsiteUrl('http://bigdaddywebsites.app.bigdaddy-nft.com/' + user.addr.toString() + nft.nftId.toString());
                  }}
                  className={`nft-item ${selectedNft === nft ? "selected" : ""}`}
                >
                  {"#" + nft.nftId.toString()}
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard className="h-100 mb-3 border-info">
            <CCardHeader>NFT Details</CCardHeader>
            <CCardBody>
              {(selectedNft !== null) ? (
                <><h2 className="navbar-text-gradient-user-menu" style={{ textAlign: 'center'}}>#{selectedNft.nftId}</h2><div>
                  <CRow className='m-4'>
                    <CCol>
                      <CFormLabel className="navbar-text-gradient-user-menu"> Website Title: </CFormLabel>
                    </CCol>
                    <CCol>
                      <CFormInput type="text" value={title} disabled={selectedNft.isDeployed} onChange={e => setTitle(e.target.value)} />
                    </CCol>
                  </CRow>

                  <CRow className='m-4'>
                    <CCol>
                      <CFormLabel className="navbar-text-gradient-user-menu"> Website Description: </CFormLabel>
                    </CCol>
                    <CCol>
                      <CFormTextarea value={description} disabled={selectedNft.isDeployed} onChange={e => setDescription(e.target.value)} />
                    </CCol>
                  </CRow>


                  {(selectedNft.isDeployed) ? (
                    <><CRow className='m-4'>
                      <CCol>
                        <CFormLabel className="navbar-text-gradient-user-menu"> Website URL: </CFormLabel>
                      </CCol>
                      <CCol>
                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">{websiteUrl}</a>
                      </CCol>
                    </CRow></>
                  ) : (
                    <>
                    <CRow className='m-4'>
                    <CCol>
                      <CFormLabel className="navbar-text-gradient-user-menu"> BigDaddy SiteId: </CFormLabel>
                    </CCol>
                    <CCol>
                      <CFormInput type="text" value={siteId}  onChange={e => setSiteId(e.target.value)} />
                    </CCol>
                  </CRow>
                      <button className="bigdaddy-button" onClick={() => { handledeployBigDaddyMarketplaceNFT(selectedNft.nftId, title, description, siteId, selectedNft.projectID) }}>Deploy</button>
                    </>
                  )}
                </div></>
              ) : () => { }}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default BigDaddyMarketplaceNFTBuyerPage;
