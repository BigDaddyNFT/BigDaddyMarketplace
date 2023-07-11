// BigDaddyMarketplaceContext.js

import { useState, createContext, useContext, useEffect } from 'react';
import BigDaddyMarketplaceTransactions from '../Flow/BigDaddyMarketplaceTransactions';
import BigDaddyMarketplaceScripts from '../Flow/BigDaddyMarketplaceScripts';
import { useNavigate } from 'react-router-dom';

const BigDaddyMarketplaceContext = createContext();

export function useBigDaddyMarketplaceContext() {
  return useContext(BigDaddyMarketplaceContext);
}

export function BigDaddyMarketplaceProvider({ children, siteId, pathAfterAuth, imagePath, creatorPathAfterAuth }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPersonnalAccess, setHasPersonnalAccess] = useState(false);
  const [isCollectionEnabled, setIsCollectionEnabled] = useState(false);
  const [nftTemplate, setNFTTemplate] = useState(null);
  const [user, setUser] = useState(null);
  const [isBigDaddyMarketplaceLoading, setIsBigDaddyMarketplaceLoading] = useState(false);
  const [isBigDaddyMarketplaceErrorModalOpen, setIsBigDaddyMarketplaceErrorModalOpen] = useState(false);
  const [BigDaddyMarketplaceErrorMessage, setBigDaddyMarketplaceErrorMessage] = useState("");
  const [fusdBalance, setfusdBalance] = useState(0.0);
  const [nftList, setNFTList] = useState([]);
  const [saleList, setSaleList] = useState({});
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const nftImagePath = imagePath;

  const BigDaddyMarketplaceScripts = new BigDaddyMarketplaceScripts();
  const BigDaddyMarketplaceTransactions = new BigDaddyMarketplaceTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      hasBigDaddyMarketplaceCollection();
      getBigDaddyMarketplaceTemplate();
      getPersonnalAccess();
      getFUSDBalance();
      getPersonnalBigDaddyMarketplaceNFTList();
      getSaleList();
      getIsCreator();
      }

  }, [user,needRefresh]);

  const validateLoggedIn = (myuser) => {

    if (user == null) {
      setUser(myuser);
      setIsLoggedIn(true);
    }
  };

  const disconnect = () => {
    if (user !== null) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };
  const getIsCreator = () => {
    if (user !== null && nftTemplate !== null) {
      if (user.addr == nftTemplate.creator) {
        setIsCreator(true);
      }
    }
  };

  const hasBigDaddyMarketplaceCollection = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const collectionExists = await BigDaddyMarketplaceScripts.hasBigDaddyMarketplaceCollection(user.addr);
      setIsCollectionEnabled(collectionExists);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const getFUSDBalance = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const fusdBalance = await BigDaddyMarketplaceScripts.getFUSDBalance(user.addr);
      setfusdBalance(fusdBalance);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const getPersonnalBigDaddyMarketplaceNFTList = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const nftList = await BigDaddyMarketplaceScripts.getPersonnalBigDaddyMarketplaceNFTList(siteId, user.addr);
      setNFTList(nftList);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const getSaleList = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const NFTList = await BigDaddyMarketplaceScripts.getBigDaddyMarketplaceSaleList(siteId);
      setSaleList(NFTList);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const getBigDaddyMarketplaceTemplate = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const template = await BigDaddyMarketplaceScripts.getTemplatebySiteId(siteId);
      setNFTTemplate(template);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const getPersonnalAccess = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const personalAccess = await BigDaddyMarketplaceScripts.getPersonnalAccess(siteId, user.addr);
      setHasPersonnalAccess(personalAccess);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const handleActivateBigDaddyMarketplaceCollection = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      await BigDaddyMarketplaceTransactions.enableBigDaddyMarketplaceCollection();
      setIsCollectionEnabled(hasBigDaddyMarketplaceCollection);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const handleBuyNFT = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      await BigDaddyMarketplaceTransactions.buyBigDaddyMarketplaceNFT(siteId);
      getPersonnalAccess();
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
      setNeedRefresh(true);
    }
  };

  const handleBuySecondHandNFT = async (sellTemplateNumber) => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      await BigDaddyMarketplaceTransactions.buySecondHandBigDaddyMarketplaceNFT(siteId, sellTemplateNumber);
      getPersonnalAccess();
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
      setNeedRefresh(true);
    }
  };

  const handleSellNFT = async (sellTemplateNumber, sellPrice) => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      await BigDaddyMarketplaceTransactions.sellBigDaddyMarketplaceNFT(siteId, sellTemplateNumber, sellPrice);
      getPersonnalAccess();
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
      setNeedRefresh(true);
    }
  };

  const closeBigDaddyMarketplaceErrorModal = () => {
    setIsBigDaddyMarketplaceErrorModalOpen(false);
    setBigDaddyMarketplaceErrorMessage("");
  };
  
  const redirectAfterAuth = () => {
  navigate(pathAfterAuth);
};

const redirectCreatorAfterAuth = () => {
  navigate(creatorPathAfterAuth);
};

const finishRefresh = () => {
  setNeedRefresh(false);
};



  return (
    <BigDaddyMarketplaceContext.Provider value={{ BigDaddyMarketplaceErrorMessage, 
                                      isBigDaddyMarketplaceLoading, 
                                      isBigDaddyMarketplaceErrorModalOpen, 
                                      isLoggedIn, 
                                      hasPersonnalAccess, 
                                      isCollectionEnabled,
                                      nftTemplate, 
                                      nftImagePath,
                                      nftList,
                                      saleList,
                                      fusdBalance,
                                      user,
                                      needRefresh,
                                      isCreator,
                                      validateLoggedIn, 
                                      disconnect, 
                                      handleBuyNFT, 
                                      handleActivateBigDaddyMarketplaceCollection, 
                                      redirectAfterAuth,
                                      redirectCreatorAfterAuth,
                                      closeBigDaddyMarketplaceErrorModal,
                                      handleSellNFT,
                                      handleBuySecondHandNFT,
                                      finishRefresh }}>
      {children}
    </BigDaddyMarketplaceContext.Provider>
  );
}
