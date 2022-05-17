import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import ContributeForm from '../../../components/ContributeForm';
import Link from 'next/link';

const CampaignShow = (props) => {

  const renderCards = () => {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager create this campaign and can create request to withdraw money',
        style: { overflowWrap: 'break-word' }
      }, 
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver'
      },
      {
        header: requestsCount,
        meta: 'Number of Request',
        description: 'A request tries to withdraw money from the contract. Request must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign'
      },
      {
        header: balance,
        meta: 'Campaign Balance (Wei)',
        description: 'The balance is how much money this campaign has left to spend'
      }
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {renderCards()} 
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async ({ query }) => {
  const address = query.show;
  const campaign = await Campaign(address);
  const summary = await campaign.methods.getSummary().call()

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address: address
   };
};    
  
export default CampaignShow;

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { show: "" } }
//     ],
//     fallback: true
//   }
// };


// export const getStaticProps = async ({ params }) => {
//   const address = params.show;
//   const campaign = await Campaign(address);

//   return { props: { address, campaign }}
// };