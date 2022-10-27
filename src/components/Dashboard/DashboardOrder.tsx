import { CustomDataGridProps } from "@/src/hooks/useDataGrid";
import { useGetOrdersQuery } from "@/src/services/orders";
import { AllOutSharp } from "@mui/icons-material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import router from "next/router";
import DashboardInfo from "./DashboardInfo";

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

const orderParams: CustomDataGridProps = {
  field: "createdAt",
  limit: 5,
  page: 1,
  sort: "desc",
  search: "",
};

const DashboardOrder: React.FC = () => {
  const { data, isFetching } = useGetOrdersQuery(orderParams);

  return (
    <>
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
    </>
  );
};

export default DashboardOrder;
