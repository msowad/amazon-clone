import Breadcrumb from '@/src/components/Breadcrumb';
import { Layout } from '@/src/components/Layout';
import { useGetOrdersQuery } from '@/src/services/orders';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { Alert, AlertTitle, CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';

// TODO: check data grid pagination

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', flex: 1, minWidth: 100 },
  {
    field: 'price',
    headerName: 'Total price',
    flex: 1,
    minWidth: 100,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      return params.value.total;
    },
  },
  {
    field: 'isPaid',
    headerName: 'Payment status',
    flex: 1,
    type: 'boolean',
  },
  {
    field: 'isDelivered',
    headerName: 'Delivery status',
    flex: 1,
    type: 'boolean',
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment method',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 160,
    valueGetter: (params: GridValueGetterParams) => {
      return `${moment(params.value).format('DD MMM YYYY LT')}`;
    },
  },
];

interface Props {
  //
}

const Index: React.FC<Props> = () => {
  const router = useRouter();

  const { isLoading, data: orders } = useGetOrdersQuery({});

  return (
    <Layout title='Order history'>
      <Breadcrumb links={[{ href: '/', label: 'Home' }]} current='orders' />

      <Box sx={{ height: 400, width: '100%', mt: 5 }}>
        {orders?.length ? (
          <DataGrid
            rows={orders}
            onRowClick={(row) => {
              router.push(`/orders/${row.id}`);
            }}
            columns={columns}
            disableSelectionOnClick
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
          />
        ) : (
          <Container maxWidth='sm' sx={{ marginTop: 5, textAlign: 'center' }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Alert
                severity='error'
                elevation={3}
                icon={<ErrorOutlineRounded fontSize='large' />}
              >
                <AlertTitle>No orders found.</AlertTitle>
                <NextLink href='/'>Go to home page</NextLink>
              </Alert>
            )}
          </Container>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
