import { DashboardInfo, DashboardLayout } from "@/src/components/Dashboard";
import useDataGrid, {
  createdAt,
  CustomDataGridProps,
  id,
} from "@/src/hooks/useDataGrid";
import { useGetOrdersQuery } from "@/src/services/orders";
import { useGetOverviewQuery } from "@/src/services/sell";
import { AllOutSharp } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

interface Props {
  //
}

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
    minWidth: 100,
    sortable: false,
  },
  {
    field: "paidAt",
    headerName: "Paid At",
    flex: 1,
    minWidth: 80,
    valueGetter: (params: GridValueGetterParams) => {
      return params.value
        ? `${moment(params.value).format("DD MMM YY")}`
        : "Not paid";
    },

    sortable: false,
  },
  {
    field: "isDelivered",
    headerName: "Delivered",
    width: 50,
    flex: 1,
    type: "boolean",

    sortable: false,
  },
  {
    field: "items-count",
    headerName: "Items count",
    flex: 1,
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.items.length,

    sortable: false,
  },
  {
    field: "items-price",
    headerName: "Price",
    flex: 1,
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.price.items,

    sortable: false,
  },
  {
    field: "total-price",
    headerName: "Total Price",
    flex: 1,
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.price.total,

    sortable: false,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    flex: 1,
    align: "right",
    headerAlign: "right",
    minWidth: 100,

    sortable: false,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80,
    valueGetter: (params: GridValueGetterParams) => {
      return `${moment(params.value).format("DD MMM YY")}`;
    },
    sortable: false,
  },
];

const Index: NextPage<Props> = () => {
  const orderParams: CustomDataGridProps = {
    field: "createdAt",
    limit: 5,
    page: 1,
    sort: "desc",
    search: "",
  };

  const router = useRouter();
  const { data: overview, isFetching: overviewLoading } = useGetOverviewQuery();
  const { data, isFetching } = useGetOrdersQuery(orderParams);
  const { defaultProps } = useDataGrid({ ...orderParams, disableSearch: true });

  return (
    <DashboardLayout>
      <DashboardInfo title="Overview" />

      {overviewLoading && (
        <Box textAlign="center" paddingTop={5} paddingBottom={10}>
          <CircularProgress />
        </Box>
      )}
      {overview && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h3" gutterBottom>
                  ${overview.totalSell}
                </Typography>
                <Typography variant="subtitle1">
                  Total order
                  {overview.totalOrders > 1 && "s"}: {overview.totalOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order Placed By</Typography>
                <Typography variant="h3" gutterBottom>
                  {overview.totalUsersPlaceOrder} user
                  {overview.totalUsersPlaceOrder > 1 && "s"}
                </Typography>
                <Typography variant="subtitle1">
                  Total User
                  {overview.totalUsers === 1 ? "" : "s"}: {overview.totalUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <DashboardInfo
        mt={5}
        mb={5}
        title="Latest orders"
        link="/dashboard/orders"
        linkText="view all orders"
        icon={<AllOutSharp />}
      />
      <DataGrid
        autoHeight
        disableColumnFilter
        disableColumnMenu
        rowsPerPageOptions={[]}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        rows={data?.docs || []}
        loading={isFetching}
        columns={columns}
        onRowClick={(row) => router.push(`/dashboard/orders/${row.id}`)}
        rowCount={data?.totalDocs}
      />
    </DashboardLayout>
  );
};

export default Index;
