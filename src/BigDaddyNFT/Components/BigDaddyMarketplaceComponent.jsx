// BigDaddyMarketplaceComponent.js

import { useBigDaddyMarketplaceContext } from '../Provider/BigDaddyMarketplaceContext.jsx';
import React, { useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import BigDaddyMarketplaceNFTBuyerPage from './BigDaddyMarketplaceNFTBuyerPage.jsx';
import BigDaddyMarketplaceActivateCollectionPage from './BigDaddyMarketplaceActivateCollectionPage.jsx';
import BigDaddyMarketplaceLoginPage from './BigDaddyMarketplaceLoginPage.jsx';


const BigDaddyMarketplaceComponent = () => {
  const { bigDaddyMarketplaceErrorMessage, 
    isBigDaddyMarketplaceLoading, 
    isBigDaddyMarketplaceErrorModalOpen, 
    isLoggedIn, 
    isCollectionEnabled,
    nftList,
    fusdBalance,
    user,
    needRefresh,
    validateLoggedIn, 
    disconnect,  
    handleActivateBigDaddyMarketplaceCollection, 
    redirectToMarketplace,
    closeBigDaddyMarketplaceErrorModal,
    handledeployBigDaddyMarketplaceNFT,
    finishRefresh  } = useBigDaddyMarketplaceContext();

  useEffect(() => {
    fcl.currentUser.subscribe((currentUser) => {
      if (currentUser.cid) {

        validateLoggedIn(currentUser);

      } else {
        disconnect();
      }
    });

  }, [validateLoggedIn, disconnect]);

  const handleLogOut = () => {
    fcl.unauthenticate();
  };

  const BigDaddyMarketplacehandleLogIn = () => {
    fcl.logIn();
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
      <div>
      {isLoggedIn ? (!isCollectionEnabled ? (
        <BigDaddyMarketplaceActivateCollectionPage
          handleActivateBigDaddyMarketplaceCollection={handleActivateBigDaddyMarketplaceCollection}
          fusdBalance={fusdBalance}
          user = {user}
          handleLogOut={handleLogOut} />
      ) :
        (
          <BigDaddyMarketplaceNFTBuyerPage
            handleLogOut={handleLogOut}
            nftList={nftList}
            fusdBalance={fusdBalance}
            user = {user}
            needRefresh = {needRefresh}
            finishRefresh={finishRefresh}
            redirectToMarketplace={redirectToMarketplace}
            handledeployBigDaddyMarketplaceNFT={handledeployBigDaddyMarketplaceNFT}/>
        )
      ) : (
        <BigDaddyMarketplaceLoginPage
          BigDaddyMarketplacehandleLogIn={BigDaddyMarketplacehandleLogIn}
        />
      )}
    </div>
    </div>
  );
};


export default BigDaddyMarketplaceComponent;