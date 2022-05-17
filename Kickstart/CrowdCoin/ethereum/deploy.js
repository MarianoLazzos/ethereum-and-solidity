const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'blast voice enough dynamic busy oil build penalty memory rebel echo okay',
  'https://rinkeby.infura.io/v3/719d498a19214e00bb0721ee3b9fc748'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(JSON.stringify(compiledFactory.abi))
  )
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "10000000", from: accounts[0] });
  
  console.log('Contract deployed to', result.options.address);
};

deploy();