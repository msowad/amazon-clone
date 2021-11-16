import CheckoutStepper from '@/src/components/CheckoutStepper';
import { Layout } from '@/src/components/Layout';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  //
}

const Confirm: React.FC<Props> = () => {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <CheckoutStepper activeStep={3} enableHref />
      </Box>
    </Layout>
  );
};

export default Confirm;
