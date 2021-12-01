import { DashboardInfo, DashboardLayout } from '@/src/components/Dashboard';
import useDataGrid, {
  createdAt,
  CustomDataGridProps,
  id,
} from '@/src/hooks/useDataGrid';
import { useGetUsersQuery } from '@/src/services/users';
import { Link, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GetServerSideProps, NextPage } from 'next';

const columns: GridColDef[] = [
  id,
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 200,
    renderCell: (cell) => (
      <Tooltip title={cell.row.emailVerified ? 'Verified' : 'Unverified'}>
        <Link
          sx={{
            color: cell.row.emailVerified ? 'success.main' : 'warning.main',
          }}
          href={`mailto:${cell.value}`}
        >
          {cell.value}
        </Link>
      </Tooltip>
    ),
  },
  {
    field: 'isAdmin',
    headerName: 'Role',
    flex: 1,
    minWidth: 20,
    renderCell: (cell) => (
      <Typography sx={{ color: cell.value ? 'success.main' : 'info.main' }}>
        {cell.value ? 'Admin' : 'User'}
      </Typography>
    ),
  },
  createdAt,
];

const Users: NextPage<CustomDataGridProps> = (props) => {
  const { defaultProps } = useDataGrid(props);

  const { data, isFetching } = useGetUsersQuery(props);

  return (
    <DashboardLayout>
      <DashboardInfo title='Users' />

      <DataGrid
        {...defaultProps}
        rows={data?.docs || []}
        loading={isFetching}
        columns={columns}
        rowCount={data?.totalDocs}
      />
    </DashboardLayout>
  );
};

export default Users;

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
