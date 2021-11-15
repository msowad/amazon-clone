import { Layout } from '@/components/Layout';
import { Typography } from '@mui/material';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography variant='h2'>Home</Typography>
    </Layout>
  );
};

export default Home;
