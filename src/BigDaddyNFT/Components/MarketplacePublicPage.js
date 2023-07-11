import React, { useState } from 'react';
import Modal from 'react-modal';
import '../BigDaddyMarketplaceCSS.css';


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
        <img src={template.miniatureURL} alt="Thumbnail" style={{ width: '100px', height: '100px' }} />
        <div>{template.name}</div>
        <div>{template.price}</div>
        <div>{template.description}</div>
      </div>

      <div className="card" onClick={openModal}>
        <div className="card-image">
          <img src={template.miniatureURL} alt="London trip" />
        </div>
        <div className="card-body">
          <span className="date">{template.price} FUSD</span>
          <h2>{template.name}</h2>
          <p>{template.description}</p>
        </div>
        <div class="card-footer">
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Website Template"
      >
        <h2>{template.name}</h2>
        <img src={template.picture1Url} alt="Image 1" />
        <img src={template.picture2Url} alt="Image 2" />
        <img src={template.picture3Url} alt="Image 3" />
        <p>Video: {template.videoUrl}</p>
        <p>Creator website: {template.creatorwebsiteUrl}</p>
        <p>Demo website: {template.demowebsiteUrl}</p>
        <p>Description: {template.description}</p>
        <p>Price: {template.price} FUSD</p>
        <button onClick={handleBuy}>Buy Website</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

const TemplateList = () => {
  const { bigDaddyMarketplaceTemplates } = useBigDaddyMarketplaceContext();

  return (
  <div className="BigDaddyMarketplaceContainer">
    <img src={"/BigDaddyMarketplace-logo-quart.png"} width={"300px"} height={"150px"} />
    <div classname="card-list">
      {bigDaddyMarketplaceTemplates.map((template) => (
        <Card key={template.templateID} template={template} />
      ))}
    </div>
  </div>
  )
};

export default TemplateList;
