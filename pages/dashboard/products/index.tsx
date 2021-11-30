import { DashboardInfo, DashboardLayout } from '@/src/components/Dashboard';
import { useGetProductsQuery } from '@/src/services/products';
import { AddCircle, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import moment from 'moment';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', flex: 1, minWidth: 100 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'image',
    headerName: 'Image',
    flex: 1,
    minWidth: 80,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextImage
          src={params.value}
          width={80}
          height={40}
          objectFit='contain'
        />
      );
    },
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    minWidth: 60,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'countInStock',
    headerName: 'Stock',
    flex: 1,
    minWidth: 50,
    type: 'number',
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    flex: 1,
    minWidth: 60,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.value} (${params.row.numReviews})`;
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
    valueGetter: (params: GridValueGetterParams) => {
      return `${moment(params.value).format('DD MMM YY')}`;
    },
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 50,
    align: 'right',
    headerAlign: 'right',
    filterable: false,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink
          href='/dashboard/products/[id]/edit'
          as={`/dashboard/products/${params.row._id}/edit`}
          passHref
        >
          <IconButton size='small'>
            <Edit fontSize='small' />
          </IconButton>
        </NextLink>
      );
    },
  },
];

interface Props {
  page: number;
  limit: number;
}

const Products: NextPage<Props> = ({ page, limit }) => {
  const [pageSize, setPageSize] = useState(limit);
  const [currentPage, setCurrentPage] = useState(page - 1);
  const router = useRouter();

  const { data, isFetching } = useGetProductsQuery({ limit, page });

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    router.push(`?limit=${pageSize}&page=${(currentPage + 1).toString()}`);
  };

  const handleCurrentPageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
    router.push(`?limit=${pageSize}&page=${(currentPage + 1).toString()}`);
  };

  return (
    <DashboardLayout title='Products'>
      <DashboardInfo
        title=' Products'
        icon={<AddCircle />}
        link='/dashboard/products/create'
        linkText='Add product'
      />

      <DataGrid
        rows={data?.docs || []}
        loading={isFetching}
        columns={columns}
        onRowClick={(row) => router.push(`/dashboard/products/${row.id}/edit`)}
        disableSelectionOnClick
        pageSize={pageSize}
        page={currentPage}
        onPageChange={handleCurrentPageChange}
        rowsPerPageOptions={[10, 20, 50]}
        onPageSizeChange={handlePageSizeChange}
        autoHeight
        getRowId={(row) => row._id}
        rowCount={data?.totalDocs}
        pagination
        paginationMode='server'
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </DashboardLayout>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      page: Number(query?.page) || 1,
      limit: Number(query?.limit) || 10,
    },
  };
};
