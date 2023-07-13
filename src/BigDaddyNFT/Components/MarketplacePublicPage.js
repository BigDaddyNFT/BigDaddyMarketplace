import React, { useState } from 'react';
import Modal from 'react-modal';
import '../BigDaddyMarketplaceCSS.css';
import { useBigDaddyMarketplaceContext } from '../Provider/BigDaddyMarketplaceContext.jsx';



const Card = ({ template }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { bigDaddyMarketplaceErrorMessage, 
          isBigDaddyMarketplaceLoading, 
          isBigDaddyMarketplaceErrorModalOpen,
          closeBigDaddyMarketplaceErrorModal,
          handleBuyBigDaddyMarketplaceNFT, 
          isLoggedIn, 
          redirectToNFTPortal } = useBigDaddyMarketplaceContext();

  const handleBuy = () => {
    if (isLoggedIn) {
      closeModal();
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

  const BigDaddyMarketplaceLoadingStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)", // Plus sombre pour faire ressortir le texte
    zIndex: 1000, // Pour être sûr que le modal est bien au-dessus du reste
  };

  return (
    <div>
    <div>
        {isBigDaddyMarketplaceLoading ? (
          <div style={BigDaddyMarketplaceLoadingStyle}>
            <div className="waviy">
              <span style={{ "--i": 1 }}>L</span>
              <span style={{ "--i": 2 }}>o</span>
              <span style={{ "--i": 3 }}>a</span>
              <span style={{ "--i": 4 }}>d</span>
              <span style={{ "--i": 5 }}>i</span>
              <span style={{ "--i": 6 }}>n</span>
              <span style={{ "--i": 7 }}>g</span>
              <span style={{ "--i": 8 }}>.</span>
              <span style={{ "--i": 8 }}>.</span>
              <span style={{ "--i": 8 }}>.</span>
            </div>
          </div>
        ) : null}

        {isBigDaddyMarketplaceErrorModalOpen ? (
          <div style={BigDaddyMarketplaceLoadingStyle}>
            <div className="modal">
              <div className="modal__content">
                <h1>Error</h1>
                <p>{bigDaddyMarketplaceErrorMessage}</p>
                <button onClick={closeBigDaddyMarketplaceErrorModal} className="modal__close">&times;</button>
              </div>
            </div>
          </div>
        ) : null}

      </div>

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
        <button onClick={closeModal} className="modal__close">&times;</button>
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
      <div className="card-list">
        {Object.values(bigDaddyMarketplaceTemplates).map((template) => (
          <Card key={template.templateID} template={template} />
        ))}
      </div>
    </div>
  )
};

export default MarketplacePublicPage;
