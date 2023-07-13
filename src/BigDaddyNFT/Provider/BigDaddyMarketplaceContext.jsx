// BigDaddyMarketplaceContext.js

import { useState, createContext, useContext, useEffect } from 'react';
import BigDaddyMarketplaceTransactions from '../Flow/BigDaddyMarketplaceTransactions';
import BigDaddyMarketplaceScripts from '../Flow/BigDaddyMarketplaceScripts';
import { useNavigate } from 'react-router-dom';

const BigDaddyMarketplaceContext = createContext();

export function useBigDaddyMarketplaceContext() {
  return useContext(BigDaddyMarketplaceContext);
}

export function BigDaddyMarketplaceProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCollectionEnabled, setIsCollectionEnabled] = useState(false);
  const [user, setUser] = useState(null);
  const [isBigDaddyMarketplaceLoading, setIsBigDaddyMarketplaceLoading] = useState(false);
  const [isBigDaddyMarketplaceErrorModalOpen, setIsBigDaddyMarketplaceErrorModalOpen] = useState(false);
  const [bigDaddyMarketplaceErrorMessage, setBigDaddyMarketplaceErrorMessage] = useState("");
  const [fusdBalance, setfusdBalance] = useState(0.0);
  const [nftList, setNFTList] = useState([]);
  const [bigDaddyMarketplaceTemplates, setBigDaddyMarketplaceTemplates] = useState({});
  const [needRefresh, setNeedRefresh] = useState(false);

  const bigDaddyMarketplaceScripts = new BigDaddyMarketplaceScripts();
  const bigDaddyMarketplaceTransactions = new BigDaddyMarketplaceTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      hasBigDaddyMarketplaceCollection();
      getFUSDBalance();
      getPersonnalBigDaddyMarketplaceNFTList();
      }
      getBigDaddyMarketplaceTemplates();

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

  const hasBigDaddyMarketplaceCollection = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const collectionExists = await bigDaddyMarketplaceScripts.hasBigDaddyMarketplaceCollection(user.addr);
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
      const fusdBalance = await bigDaddyMarketplaceScripts.getFUSDBalance(user.addr);
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
      const nftList = await bigDaddyMarketplaceScripts.getPersonnalBigDaddyMarketplaceNFTList(user.addr);
      setNFTList(nftList);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const getBigDaddyMarketplaceTemplates = async () => {
    setIsBigDaddyMarketplaceLoading(true);
    try {
      const NFTList = await bigDaddyMarketplaceScripts.getBigDaddyMarketplaceTemplates();
      setBigDaddyMarketplaceTemplates(NFTList);
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
      await bigDaddyMarketplaceTransactions.enableBigDaddyMarketplaceCollection();
      setIsCollectionEnabled(hasBigDaddyMarketplaceCollection);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
    }
  };

  const handleBuyBigDaddyMarketplaceNFT = async (templateId) => {
    setIsBigDaddyMarketplaceLoading(true);

    try {
      await bigDaddyMarketplaceTransactions.buyBigDaddyMarketplaceNFT(templateId);
    } catch (error) {
      setBigDaddyMarketplaceErrorMessage(error);
      setIsBigDaddyMarketplaceErrorModalOpen(true);
    } finally {
      setIsBigDaddyMarketplaceLoading(false);
      setNeedRefresh(true);
    }
  };

  const handledeployBigDaddyMarketplaceNFT = async (nftId, websiteTitle, websiteDescription, siteId) => {
    // nom du projet a créer c'est (user.addr+nftId)
    const projectName = user.addr+nftId;
    const description = websiteTitle;
    setIsBigDaddyMarketplaceLoading(true);
//TODO: move base_url in .env
    const response = await fetch('https://us-central1-bigdaddynft.cloudfunctions.net/forkAndDeploy', {
    // const response = await fetch('http://127.0.0.1:5001/bigdaddynft/us-central1/forkAndDeploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName: projectName,
        publicUrl: `http://bigdaddywebsites.app.bigdaddy-nft.com/${projectName}`,
        siteId: siteId,
        description: description,
        projectId: 20,
        endPath: projectName
      }),
    });
    console.log("First response :: ", response);

    if (!response.ok) {
      console.log("Responses[KO] :: ", response);
      throw new Error('Failed fork or deploy ');
    }
    try {
      await bigDaddyMarketplaceTransactions.deployBigDaddyMarketplaceNFT(nftId, websiteTitle, websiteDescription, siteId);
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
  
  const redirectToMarketplace = () => {
  navigate("/");
};

const redirectToNFTPortal = () => {
  navigate("/myprofile");
};

const finishRefresh = () => {
  setNeedRefresh(false);
};



  return (
    <BigDaddyMarketplaceContext.Provider value={{ bigDaddyMarketplaceErrorMessage, 
                                      isBigDaddyMarketplaceLoading, 
                                      isBigDaddyMarketplaceErrorModalOpen, 
                                      isLoggedIn, 
                                      isCollectionEnabled,
                                      bigDaddyMarketplaceTemplates,
                                      nftList,
                                      fusdBalance,
                                      user,
                                      needRefresh,
                                      validateLoggedIn, 
                                      disconnect,  
                                      handleActivateBigDaddyMarketplaceCollection, 
                                      redirectToMarketplace,
                                      redirectToNFTPortal,
                                      closeBigDaddyMarketplaceErrorModal,
                                      handleBuyBigDaddyMarketplaceNFT,
                                      handledeployBigDaddyMarketplaceNFT,
                                      finishRefresh }}>
      {children}
    </BigDaddyMarketplaceContext.Provider>
  );
}
