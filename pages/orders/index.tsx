import Breadcrumb from '@/src/components/Breadcrumb';
import { Layout } from '@/src/components/Layout';
import useDataGrid, { CustomDataGridProps } from '@/src/hooks/useDataGrid';
import { useGetOrdersQuery } from '@/src/services/orders';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

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

const Orders: React.FC<CustomDataGridProps> = (props) => {
  const router = useRouter();
  const { defaultProps } = useDataGrid({ ...props, disableSearch: true });

  const { data, isFetching } = useGetOrdersQuery({ ...props, user: true });

  return (
    <Layout title='Order history'>
      <Breadcrumb links={[{ href: '/', label: 'Home' }]} current='orders' />

      <Box sx={{ height: 400, width: '100%', mt: 5 }}>
        <DataGrid
          {...defaultProps}
          rows={data?.docs || []}
          loading={isFetching}
          columns={columns}
          onRowClick={(row) => router.push(`/orders/${row.id}`)}
          rowCount={data?.totalDocs}
        />
      </Box>
    </Layout>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      field: query.field || 'createdAt',
      sort: query.sort || 'desc',
    },
  };
};
