import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductDisplay from 'src/sections/billing/product-display';

// ----------------------------------------------------------------------

export default function BillingView() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);
  let component

  if (!success && message === '') {
    component = <ProductDisplay />;
  } else if (success && sessionId !== '') {
    component = <SuccessDisplay sessionId={sessionId} />;
  } else {
    component = <Message message={message} />;
  }
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {component}
      </Grid>
    </Container>
  );
}

const SuccessDisplay = ({ sessionId }) => (
  <section className='section'>
    <div className="product Box-root">
      <div className="description Box-root">
        <h3>Subscription to starter plan successful!</h3>
      </div>
    </div>
    <form action="/create-portal-session" method="POST">
      <input
        type="hidden"
        id="session-id"
        name="session_id"
        value={sessionId}
      />
      <button className="button" id="checkout-and-portal-button" type="submit">
        Manage your billing information
      </button>
    </form>
  </section>
);

SuccessDisplay.propTypes = {
  sessionId: PropTypes.string,
};

const Message = ({ message }) => (
  <section className='section'>
    <p className='text'>{message}</p>
  </section>
);

Message.propTypes = {
  message: PropTypes.string,
};