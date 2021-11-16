import CheckoutStepper from '@/src/components/CheckoutStepper';
import { Layout } from '@/src/components/Layout';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  //
}

const Payment: React.FC<Props> = () => {
  return (
    <Layout title='Complete payment'>
      <Box sx={{ mb: 4 }}>
        <CheckoutStepper activeStep={2} enableHref />
      </Box>
    </Layout>
  );
};

export default Payment;
