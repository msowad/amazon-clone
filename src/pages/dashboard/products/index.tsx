import { DashboardInfo, DashboardLayout } from "@/src/components/Dashboard";
import useDataGrid, {
  actions,
  createdAt,
  CustomDataGridProps,
  id,
} from "@/src/hooks/useDataGrid";
import { useGetProductsQuery } from "@/src/services/products";
import { AddCircle } from "@mui/icons-material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import NextImage from "next/image";

const columns: GridColDef[] = [
  id,
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "image",
    headerName: "Image",
    flex: 1,
    minWidth: 80,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextImage
          src={params.value}
          width={80}
          height={40}
          objectFit="contain"
        />
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    minWidth: 60,
    type: "number",
    align: "left",
    headerAlign: "left",
  },
  {
    field: "countInStock",
    headerName: "Stock",
    flex: 1,
    minWidth: 50,
    type: "number",
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "brand",
    headerName: "Brand",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1,
    minWidth: 60,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.value} (${params.row.numReviews})`;
    },
  },
  createdAt,
  actions({ url: "/dashboard/products" }),
];

const Products: NextPage<CustomDataGridProps> = (props) => {
  const router = useRouter();
  const { defaultProps } = useDataGrid(props);

  const { data, isFetching } = useGetProductsQuery(props);

  return (
    <DashboardLayout title="Products">
      <DashboardInfo
        title="Products"
        icon={<AddCircle />}
        link="/dashboard/products/create"
        linkText="Add product"
      />

      <DataGrid
        {...defaultProps}
        rows={data?.docs || []}
        loading={isFetching}
        columns={columns}
        onRowClick={(row) => router.push(`/dashboard/products/${row.id}/edit`)}
        rowCount={data?.totalDocs}
      />
    </DashboardLayout>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      field: query.field || "createdAt",
      sort: query.sort || "desc",
      search: query.search || "",
    },
  };
};
