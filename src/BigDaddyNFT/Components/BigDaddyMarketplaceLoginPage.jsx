import React from "react";
import '../BigDaddyMarketplaceCSS.css';

function BigDaddyMarketplaceLoginPage({ BigDaddyMarketplacehandleLogIn}) {
  return (
    <div className="BigDaddyMarketplaceContainer">
    <img src={"/logo-4.png"} width={"300px"} height={"150px"}/>
      <h1>Welcome to your NFT securised website</h1>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <button className="glow-on-hover" onClick={BigDaddyMarketplacehandleLogIn}>Log In</button>
      </div>
    </div>
  );
}

export default BigDaddyMarketplaceLoginPage;