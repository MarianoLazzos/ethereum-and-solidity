import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { createFactoryInstance } from '../../ethereum/factory';
import { detectProvider } from '../../ethereum/web3';
import { useRouter } from 'next/router';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const factory = await createFactoryInstance();
    const web3 = await detectProvider();

    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0]
      });
      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button disabled={loading} loading={loading} primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
