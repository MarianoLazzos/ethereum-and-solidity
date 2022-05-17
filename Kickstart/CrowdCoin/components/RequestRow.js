import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { detectProvider } from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import Web3 from 'web3';

const RequestRow = ({ id, address, request, approversCount }) => {
  const { Row, Cell } = Table;
  const readyToFinalize = request.approvalCount > approversCount / 2;
  
  const onApprove = async () => {
    const campaign = await Campaign(address);
    const web3 = await detectProvider();
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    })
  };  

  const onFinalize = async () => {
    const campaign = await Campaign(address);
    const web3 = await detectProvider();
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0]
    })
  }

  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{request.value}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}/{approversCount}</Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>Approve</Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
        )}
      </Cell>
    </Row>
  );
};



export default RequestRow;