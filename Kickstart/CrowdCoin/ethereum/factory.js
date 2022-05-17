import { detectProvider } from './web3';
import CampaignFactory from './build/CampaignFactory.json';

export const createFactoryInstance = async () => {
  const web3 = await detectProvider();

  const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(CampaignFactory.abi)),
    '0xb7c4F9cB01F207e828194617DaA88bCa8bC16b81'
  )
  return instance;
}

