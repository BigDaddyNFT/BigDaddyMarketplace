import React from "react";
import '../BigDaddyMarketplaceCSS.css';
import { CRow } from "@coreui/react";

function BigDaddyMarketplaceLoginPage({ BigDaddyMarketplacehandleLogIn }) {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
    <CRow className="m-5 justify-content-center"  xs={{ gutterX: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <h1 >Welcome to your monetized website Marketplace</h1>
      </div>
    </CRow>
    <CRow className="mt-5 mb-5" xs={{ gutterX: 5 }}>  {/* Increased margin-top (mt-5) */}
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <button className="bigdaddy-button" onClick={BigDaddyMarketplacehandleLogIn}>Log In</button>
      </div>
    </CRow>
  </div>
  </>
  );
}

export default BigDaddyMarketplaceLoginPage;