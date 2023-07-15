import React, { useState } from 'react';
import '../BigDaddyMarketplaceCSS.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useBigDaddyMarketplaceContext } from '../Provider/BigDaddyMarketplaceContext.jsx';
import { CNavbar, CNavbarBrand, CNavbarText, CNavbarNav, CNavItem, CNavLink,CContainer, CFormLabel, CCarousel, CCarouselItem, CImage, CCard, CCardImage, CCardBody, CCardText, CButton, CCardTitle, CCardSubtitle, CRow, CCol, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react';



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

      < CCard style={{ width: '18rem' }} className="h-100 mb-3 border-light text-center" textColor="black">
        <CCardImage orientation="top" src={template.miniatureURL} />
        <CCardBody>
          <CCardTitle>{template.name}</CCardTitle>
          <CCardSubtitle className="mb-2 text-medium-emphasis">{template.price} FUSD</CCardSubtitle>
          <CCardText>
            {template.description}
          </CCardText>
          <CButton CButton color="light" onClick={openModal}>Details</CButton>
        </CCardBody>
      </CCard>

      <CModal size="lg" visible={modalIsOpen} onClose={() => closeModal()}>
        <CModalHeader onClose={() => closeModal()}>
          <CModalTitle>{template.name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCarousel controls indicators>
            <CCarouselItem>
              <CImage className="d-block w-100" src={template.picture1Url} alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src={template.picture2Url} alt="slide 2" />
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src={template.picture3Url} alt="slide 3" />
            </CCarouselItem>
          </CCarousel>
          <CContainer>
          <CRow className="mb-3" xs={{ gutterX: 5 }}>
            <CFormLabel className="col-sm-2 col-form-label" style={{color: 'purple'}}>Video</CFormLabel>
            <CCol sm={10} className="mx-3">
              <a href={template.videoUrl} target="_blank" rel="noopener noreferrer">{template.videoUrl}</a>
            </CCol>
          </CRow>
          <CRow className="mb-3" xs={{ gutterX: 5 }}>
          <CFormLabel className="col-sm-2 col-form-label" style={{color: 'purple'}}>Creator Website</CFormLabel>
            <CCol sm={10} className="mx-3">
              <a href={template.creatorwebsiteUrl} target="_blank" rel="noopener noreferrer">{template.creatorwebsiteUrl}</a>
            </CCol>
          </CRow>
          <CRow className="mb-3" xs={{ gutterX: 5 }}>
          <CFormLabel className="col-sm-2 col-form-label" style={{color: 'purple'}}>Demo Website</CFormLabel>
            <CCol sm={10} className="mx-3">
              <a href={template.demowebsiteUrl} target="_blank" rel="noopener noreferrer">{template.demowebsiteUrl}</a>
            </CCol>
          </CRow>
          <CRow className="mb-3" xs={{ gutterX: 5 }}>
          <CFormLabel className="col-sm-2 col-form-label" style={{color: 'purple'}}>Description</CFormLabel>
            <CCol sm={10} className="mx-3">
            {template.description}
            </CCol>
          </CRow>
          <CRow className="mb-3" xs={{ gutterX: 5 }}>
          <CFormLabel className="col-sm-2 col-form-label" style={{color: 'purple'}}>Price</CFormLabel>
            <CCol sm={10} className="mx-3">
            {template.price} FUSD
            </CCol>
          </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <button className="bigdaddy-button" onClick={handleBuy}>Buy Website</button>
        </CModalFooter>
      </CModal>


    </div>
  );
};

const MarketplacePublicPage = () => {
  const { bigDaddyMarketplaceTemplates } = useBigDaddyMarketplaceContext();

  return (
      <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4 m-5">
        {Object.values(bigDaddyMarketplaceTemplates).map((template) => (
          <CCol xs>
            <Card key={template.templateID} template={template} />
          </CCol>
        ))}
      </CRow>
  )
};

export default MarketplacePublicPage;
