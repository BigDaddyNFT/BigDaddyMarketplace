import './App.css';
import { BigDaddyMarketplaceProvider, BigDaddyMarketplaceComponent} from './BigDaddyNFT/BigDaddy-config';
import MarketplacePublicPage from './BigDaddyNFT/Components/MarketplacePublicPage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './BigDaddyNFT/BigDaddy-flow-config'

function App() {
  return (
    <HashRouter basename="/">
     <BigDaddyMarketplaceProvider >
        <Routes>
          <Route path="/" element={<MarketplacePublicPage />} />
          <Route path="/myprofile" element={<BigDaddyMarketplaceComponent />} />
        </Routes>
      </BigDaddyMarketplaceProvider>
  </HashRouter>   
  );
}

export default App;
