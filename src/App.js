import './App.css';
import { BigDaddyMarketplaceProvider, BigDaddyMarketplaceComponent} from './BigDaddyNFT/BigDaddy-config';
import MarketplacePublicPage from './BigDaddyNFT/Components/MarketplacePublicPage';
import BigDaddyMarketplaceNavBar from './BigDaddyNFT/Components/BigDaddyMarketplaceNavBar';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './BigDaddyNFT/BigDaddy-flow-config'

function App() {
  return (
    <HashRouter basename="/">
     <BigDaddyMarketplaceProvider >
    <div className="BigDaddyMarketplaceContainer">
        <BigDaddyMarketplaceNavBar />
        <Routes>
          <Route path="/" element={<MarketplacePublicPage />} />
          <Route path="/myprofile" element={<BigDaddyMarketplaceComponent />} />
        </Routes>
    </div>
      </BigDaddyMarketplaceProvider>
  </HashRouter>   
  );
}

export default App;
