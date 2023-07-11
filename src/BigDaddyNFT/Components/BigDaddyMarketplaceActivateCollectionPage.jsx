import React from "react";
import '../BigDaddyMarketplaceCSS.css';

function BigDaddyMarketplaceActivateAccountPage({ handleActivateBigDaddyMarketplaceCollection, fusdBalance, handleLogOut, user}) {
  return (
    <div className="BigDaddyMarketplaceContainer">
      <div className="userProfile">
        <p>Address: {user.addr}</p>
        <p>FUSD Balance: {fusdBalance}</p>
        <button onClick={handleLogOut} className="glow-on-hover">Log Out</button>
      </div>
      <img src={"/BigDaddyMarketplace-logo-quart.png"} width={"300px"} height={"150px"}/>
      <h1>Activate your NFT Collection</h1>
      <h2>In order to buy andd use your NFT you have to create a collection in your blockchain Account.</h2>
      <h2>If it is not allready done, this will also create you a FUSD Wallet in order to make payments.</h2>
      <div>
          <button className="glow-on-hover" onClick={handleActivateBigDaddyMarketplaceCollection}>Activate BigDaddyMarketplaceCollection</button>
        </div>
    </div>
  );
}

export default BigDaddyMarketplaceActivateAccountPage;
