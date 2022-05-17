import Web3 from 'web3';

export const detectProvider = async () => {
  const web3 = new Web3();

  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    //User have metamask
    await window.ethereum.enable();
    web3 = new Web3(window.ethereum);
    
    console.log("Have Metamask");
  } else {
    //User dont have metamask
    const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/719d498a19214e00bb0721ee3b9fc748'
    );
    web3.setProvider(provider);
    console.log("Not Have Metamask");
  }

  return web3;
}