import React, { useState } from 'react';
import Modal from 'react-modal';
import '../BigDaddyMarketplaceCSS.css';
import { useBigDaddyMarketplaceContext } from '../Provider/BigDaddyMarketplaceContext.jsx';



const Card = ({ template }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { handleBuyBigDaddyMarketplaceNFT, isLoggedIn, redirectToNFTPortal } = useBigDaddyMarketplaceContext();

  const handleBuy = () => {
    if (isLoggedIn) {
      handleBuyBigDaddyMarketplaceNFT(template.templateID);
    }
    else {
      redirectToNFTPortal();
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
    

      <div className="card" onClick={openModal}>
        <div className="card-image">
          <img src={template.miniatureURL} alt="London trip" width={"300px"} height={"150px"}/>
        </div>
        <div className="card-body">
          <span className="date">{template.price} FUSD</span>
          <h2>{template.name}</h2>
          <p>{template.description}</p>
        </div>
        <div class="card-footer">
          <h4 >Details</h4>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Website Template"
      >
        <h2>{template.name}</h2>
        <img src={template.picture1Url} alt="Image 1" width={"600px"} height={"300px"}/>
        <img src={template.picture2Url} alt="Image 2" width={"600px"} height={"300px"}/>
        <img src={template.picture3Url} alt="Image 3" width={"600px"} height={"300px"}/>
        <p>Video: {template.videoUrl}</p>
        <p>Creator website: {template.creatorwebsiteUrl}</p>
        <p>Demo website: {template.demowebsiteUrl}</p>
        <p>Description: {template.description}</p>
        <p>Price: {template.price} FUSD</p>
        <button className="glow-on-hover" onClick={handleBuy}>Buy Website</button>
        <button className="glow-on-hover" onClick={closeModal}>Close Window</button>
      </Modal>
    </div>
  );
};

const MarketplacePublicPage = () => {
  const { bigDaddyMarketplaceTemplates , redirectToNFTPortal} = useBigDaddyMarketplaceContext();

  return (
    <div className="BigDaddyMarketplaceContainer">
      <img src={"/bigdaddymarketplace/logo-4.png"} width={"300px"} height={"150px"} />
      <h1>BigDaddy Marketplace</h1>
      <button onClick={redirectToNFTPortal} className="glow-on-hover logout">Go to my Profile Page</button>
      <div classname="card-list">
        {Object.values(bigDaddyMarketplaceTemplates).map((template) => (
          <Card key={template.templateID} template={template} />
        ))}
      </div>
    </div>
  )
};

export default MarketplacePublicPage;
