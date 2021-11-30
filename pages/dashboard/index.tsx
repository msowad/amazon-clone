import { DashboardLayout } from '@/src/components/Dashboard';
import { Toolbar, Typography } from '@mui/material';
import { NextPage } from 'next';

interface Props {
  //
}

const Index: NextPage<Props> = () => {
  return (
    <DashboardLayout>
      <Typography component='h2' textAlign='center' variant='h2' gutterBottom>
        Welcome to the dashboard
      </Typography>
    </DashboardLayout>
  );
};

export default Index;
