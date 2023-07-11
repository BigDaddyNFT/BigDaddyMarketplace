import './App.css';
import { BigDaddyMarketplaceProvider, BigDaddyMarketplaceComponent} from './BigDaddyMarketplaceNFT/BigDaddyMarketplace-config';
import MarketplacePublicPage from './MarketplacePublicPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './BigDaddyMarketplaceNFT/BigDaddyMarketplace-flow-config'

function App() {
  return (
    <BrowserRouter>
     <BigDaddyMarketplaceProvider >
        <Routes>
          <Route path="/" element={<MarketplacePublicPage />} />
          <Route path="/myprofile" element={<BigDaddyMarketplaceComponent />} />
        </Routes>
      </BigDaddyMarketplaceProvider>
  </BrowserRouter>   
  );
}

export default App;
