import { DashboardInfo, DashboardLayout } from '@/src/components/Dashboard';
import useDataGrid, {
  createdAt,
  CustomDataGridProps,
  id,
} from '@/src/hooks/useDataGrid';
import { useGetOrdersQuery } from '@/src/services/orders';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const columns: GridColDef[] = [
  id,
  {
    field: 'paidAt',
    headerName: 'Paid At',
    flex: 1,
    minWidth: 80,
    valueGetter: (params: GridValueGetterParams) => {
      return params.value
        ? `${moment(params.value).format('DD MMM YY')}`
        : 'Not paid';
    },
  },
  {
    field: 'isDelivered',
    headerName: 'Delivered',
    width: 50,
    flex: 1,
    type: 'boolean',
  },
  {
    field: 'items-count',
    headerName: 'Items count',
    flex: 1,
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.items.length,
  },
  {
    field: 'items-price',
    headerName: 'Price',
    flex: 1,
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.price.items,
  },
  {
    field: 'total-price',
    headerName: 'Total Price',
    flex: 1,
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.price.total,
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    minWidth: 100,
  },
  createdAt,
];

const Orders: NextPage<CustomDataGridProps> = (props) => {
  const router = useRouter();
  const { defaultProps } = useDataGrid({ ...props, disableSearch: true });

  const { data, isFetching } = useGetOrdersQuery(props);

  return (
    <DashboardLayout title='Orders'>
      <DashboardInfo title='Orders' />

      <DataGrid
        {...defaultProps}
        rows={data?.docs || []}
        loading={isFetching}
        columns={columns}
        onRowClick={(row) => router.push(`/dashboard/orders/${row.id}`)}
        rowCount={data?.totalDocs}
      />
    </DashboardLayout>
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
