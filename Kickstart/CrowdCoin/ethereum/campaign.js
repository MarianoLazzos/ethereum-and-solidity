import { detectProvider } from './web3';
import Campaign from './build/Campaign.json';

export default async (address) => {
  const web3 = await detectProvider();
  return new web3.eth.Contract(
    JSON.parse(JSON.stringify(Campaign.abi)),
    address
  );
};
