import QuickSearchToolbar from '@/src/components/Dashboard/QuickSearchToolbar';
import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {
  GridColDef,
  GridFeatureMode,
  GridRowModel,
  GridSortItem,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { useState } from 'react';

export interface CustomDataGridProps {
  page: number;
  limit: number;
  field: string;
  sort: 'desc' | 'asc';
  search: string;
}

const useDataGrid = ({
  limit,
  page,
  field,
  sort,
  search,
  disableSearch,
}: CustomDataGridProps & { disableSearch?: boolean }) => {
  const [pageSize, setPageSize] = useState(limit);
  const [currentPage, setCurrentPage] = useState(page - 1);
  const [sortModel, setSortModel] = useState<GridSortItem>({ field, sort });
  const [searchQuery, setSearchQuery] = useState(search);
  const router = useRouter();

  const changeRouter = (values: {
    search?: string;
    pageSize?: number;
    currentPage?: number;
    field?: string;
    sort?: 'desc' | 'asc';
  }) => {
    let url = `?limit=${values.pageSize || pageSize}&page=${
      values.currentPage || currentPage
    }&field=${values.field || sortModel?.field || 'createdAt'}&sort=${
      values.sort || sortModel?.sort || 'desc'
    }`;
    !disableSearch && (url += `&search=${values.search || searchQuery}`);
    router.push(url);
  };

  const handlePageSizeChange = (pageSize: number) => {
    changeRouter({ pageSize });
    setPageSize(pageSize);
  };

  const handleCurrentPageChange = (currentPage: number) => {
    changeRouter({ currentPage: currentPage + 1 });
    setCurrentPage(currentPage + 1);
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    const field = sortModel[0]?.field || 'createdAt';
    const sort = sortModel[0]?.sort || 'desc';

    changeRouter({ field, sort });
    setSortModel({ field, sort });
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeRouter({ search: e.target.value });
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    changeRouter({ search: searchQuery });
  };

  const defaultProps = {
    pageSize,
    page: currentPage < 1 ? 0 : currentPage - 1,
    onPageChange: handleCurrentPageChange,
    rowsPerPageOptions: [10, 20, 50, 100],
    onPageSizeChange: handlePageSizeChange,
    autoHeight: true,
    disableSelectionOnClick: true,
    getRowId: (row: GridRowModel) => row._id,
    paginationMode: 'server' as GridFeatureMode,
    sortingMode: 'server' as GridFeatureMode,
    disableColumnFilter: true,
    components: { Toolbar: QuickSearchToolbar },
    componentsProps: {
      toolbar: {
        value: searchQuery,
        onChange: handleSearchQueryChange,
        onSearch: handleSearch,
        disableSearch: disableSearch,
      },
    },
    onSortModelChange: handleSortModelChange,
  };

  return { defaultProps };
};

export default useDataGrid;

export const createdAt: GridColDef = {
  field: 'createdAt',
  headerName: 'Created At',
  headerAlign: 'right',
  align: 'right',
  flex: 1,
  minWidth: 80,
  valueGetter: (params: GridValueGetterParams) => {
    return `${moment(params.value).format('DD MMM YY')}`;
  },
};

export const id: GridColDef = {
  field: '_id',
  headerName: 'ID',
  flex: 1,
  minWidth: 100,
};

export const actions = ({ url }: { url: string }): GridColDef => {
  return {
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
        <NextLink href={`${url}/${params.row._id}/edit`} passHref>
          <IconButton size='small'>
            <Edit fontSize='small' />
          </IconButton>
        </NextLink>
      );
    },
  };
};
