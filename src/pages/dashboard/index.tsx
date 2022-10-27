import { DashboardInfo, DashboardLayout } from "@/src/components/Dashboard";
import DashboardOrder from "@/src/components/Dashboard/DashboardOrder";
import { useGetOverviewQuery } from "@/src/services/sell";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

interface Props {
  //
}

const Index: NextPage<Props> = () => {
  const router = useRouter();
  const { data: overview, isFetching: overviewLoading } = useGetOverviewQuery();

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

      {!overviewLoading && <DashboardOrder />}
    </DashboardLayout>
  );
};

export default Index;
