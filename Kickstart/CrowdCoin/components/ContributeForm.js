import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import { detectProvider } from '../ethereum/web3';
import { useRouter } from 'next/router';

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaign = await Campaign(address);
    const web3 = await detectProvider();

    setLoading(true);
    setErrorMessage('');
    
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });

      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setValue('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          label="ether"
          labelPosition="right"
          onChange={e => setValue(e.target.value)}
        />
      </Form.Field>
      <Message error header="Oops" content={errorMessage} />
      <Button primary loading={loading} disabled={loading}>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;