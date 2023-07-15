import React from "react";
import '../BigDaddyMarketplaceCSS.css';

function BigDaddyMarketplaceActivateAccountPage({ handleActivateBigDaddyMarketplaceCollection, fusdBalance, handleLogOut, user }) {
  return (

    <>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
    <h1 style={{ margin: '50px'}}>Activate your Marketplace Collection</h1>

    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
      <h2>In order to buy and use your website you have to create a collection in your blockchain Account.</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <h2>If it is not allready done, this will also create you a FUSD Wallet in order to make payments.</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }} >
        <button className="bigdaddy-button" onClick={handleActivateBigDaddyMarketplaceCollection} style={{ margin: '50px'}}>Activate your Collection</button>
      </div>
    </>
  );
}

export default BigDaddyMarketplaceActivateAccountPage;
