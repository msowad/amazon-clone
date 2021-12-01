import { DashboardInfo, DashboardLayout } from '@/src/components/Dashboard';
import useDataGrid, { CustomDataGridProps } from '@/src/hooks/useDataGrid';
import { useGetOrdersQuery } from '@/src/services/orders';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const Orders: NextPage<CustomDataGridProps> = (props) => {
  const router = useRouter();
  const { defaultProps } = useDataGrid(props);

  const { data, isFetching } = useGetOrdersQuery(props);

  return (
    <DashboardLayout>
      <DashboardInfo title='Orders' />
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
      search: query.search || '',
    },
  };
};
