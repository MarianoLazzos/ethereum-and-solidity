import React from 'react';
import Layout from '../../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';
import { detectProvider } from '../../../../ethereum/web3';

const RequestIndex = ({ campaign, requests, requestCount, approversCount }) => {
  const router = useRouter();
  const address = router.query.show;
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return requests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        request={request}
        address={address}
        approversCount={approversCount}
      />
    })
  }

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestCount} requests</div>
    </Layout>
  );
}

RequestIndex.getInitialProps = async ({ query }) => {
  const campaign = await Campaign(query.show);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map((element, index) => {
      return campaign.methods.requests(index).call()
    })
  );

  return { campaign, requests, requestCount, approversCount };
}; 

export default RequestIndex;