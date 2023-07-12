import './App.css';
import { BigDaddyMarketplaceProvider, BigDaddyMarketplaceComponent} from './BigDaddyNFT/BigDaddy-config';
import MarketplacePublicPage from './BigDaddyNFT/Components/MarketplacePublicPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './BigDaddyNFT/BigDaddy-flow-config'

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
