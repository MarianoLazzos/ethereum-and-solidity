import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { createFactoryInstance } from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';

const CampaignIndex = ({ campaigns }) => {

  const renderCampaigns = () => {
    const items = campaigns.map(address => {
      return {
        header: address,
        description:
          <Link href={`/campaigns/${address}`}>
            View Campaign
          </Link>,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button floated="right" content="Create Campaign" icon="add circle" primary />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const factory = await createFactoryInstance();
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns, factory };
};

export default CampaignIndex;

