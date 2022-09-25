import { PaymentMethod } from "@/src/app/cart";
import { DashboardInfo, DashboardLayout } from "@/src/components/Dashboard";
import {
  useGetOrderDetailsForAdminQuery,
  useUpdateDeliveryStatusMutation,
  useUpdatePaymentStatusMutation,
} from "@/src/services/orders";
import { getPaymentMethodLabel } from "@/src/utils/getPaymentMethodLabel";
import { AllOutSharp, ErrorOutlineRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";

interface Props {
  //
}

const Order: NextPage<Props> = () => {
  const router = useRouter();
  const { isLoading, data: order } = useGetOrderDetailsForAdminQuery({
    id: router.query.id as string,
  });
  const [updatePaymentStatus, { isLoading: updatingStatus }] =
    useUpdatePaymentStatusMutation();

  const [updateDeliveryStatus, { isLoading: updatingDeliveryStatus }] =
    useUpdateDeliveryStatusMutation();

  return (
    <DashboardLayout title="Order details">
      <DashboardInfo
        title="Order details"
        icon={<AllOutSharp />}
        link="/dashboard/orders"
        linkText="All orders"
        prependAction={
          <>
            {order?.paymentMethod === "cod" && (
              <LoadingButton
                onClick={async () => {
                  await updatePaymentStatus({ id: order?._id });
                }}
                loading={updatingStatus}
                sx={{ mr: 1 }}
                variant="contained"
                color="warning"
                size="small"
              >
                update payment status
              </LoadingButton>
            )}
            {order?._id && (
              <LoadingButton
                onClick={async () => {
                  await updateDeliveryStatus({ id: order._id });
                }}
                loading={updatingDeliveryStatus}
                sx={{ mr: 1 }}
                variant="contained"
                color="success"
                size="small"
              >
                update delivery status
              </LoadingButton>
            )}
          </>
        }
      />
      {order?._id ? (
        <Grid container spacing={3} sx={{ marginTop: 5 }}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Order ID: {order._id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Delivery status: {order.isDelivered ? "Delivered" : "Pending"}
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Grid container gap={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Shipping details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Name: {order.shippingDetails.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Address: {order.shippingDetails.address}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      City: {order.shippingDetails.city}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      country: {order.shippingDetails.country}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      postal code: {order.shippingDetails.postalCode}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Payment details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Payment method:{" "}
                      {getPaymentMethodLabel(
                        order.paymentMethod as PaymentMethod
                      )}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Status: {order.isPaid ? "Paid" : "Not paid"}
                    </Typography>
                    {order.paidAt && (
                      <Typography variant="body1" gutterBottom>
                        Paid at:{" "}
                        {moment(order.paidAt).format("DD MMM YYYY h:m:s")}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Order items
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.items.map((item) => (
                            <TableRow key={item._id as string}>
                              <TableCell>
                                <NextImage
                                  src={item.image}
                                  width={86}
                                  height={86}
                                  objectFit="contain"
                                  alt={item.name}
                                />
                              </TableCell>
                              <TableCell>
                                <NextLink
                                  passHref
                                  href={`/dashboard/products/${item._id}/edit`}
                                >
                                  <a>{item.name}</a>
                                </NextLink>
                              </TableCell>
                              <TableCell align="right">
                                ${item.price * item.quantity}
                                <div>
                                  ${item.price} X {item.quantity}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h5">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${order.price.items}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${order.price.tax}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${order.price.shipping}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${order.price.total}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Container maxWidth="sm" sx={{ marginTop: 5, textAlign: "center" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Alert
              severity="error"
              elevation={3}
              icon={<ErrorOutlineRounded fontSize="large" />}
            >
              <AlertTitle>Order no found.</AlertTitle>
              <NextLink href="/dashboard/orders">See all orders</NextLink>
            </Alert>
          )}
        </Container>
      )}
    </DashboardLayout>
  );
};

export default Order;
