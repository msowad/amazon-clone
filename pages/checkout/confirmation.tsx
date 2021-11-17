import {
  CartItem,
  PaymentMethod,
  resetCart,
  ShippingDetails,
} from '@/src/app/cart';
import CheckoutStepper from '@/src/components/CheckoutStepper';
import { Layout } from '@/src/components/Layout';
import axios from '@/src/utils/axios';
import { getPaymentMethodLabel } from '@/src/utils/getPaymentMethodLabel';
import { Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import NextImage from 'next/image';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  cartItems: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
}

const Confirm: React.FC<Props> = ({
  cartItems,
  shippingDetails,
  paymentMethod,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const handleOrder = async () => {
    NProgress.start();
    const { data } = await axios.post('/orders/create', {
      cartItems,
      shippingDetails,
      paymentMethod,
    });
    dispatch(resetCart());
    router.push(`/orders/${data._id}`);
    NProgress.done();
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <CheckoutStepper activeStep={3} enableHref />
      </Box>
      <Grid container spacing={3} sx={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <Typography variant='h4' gutterBottom>
            Confirm order
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Grid container gap={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='h5' gutterBottom>
                      Shipping details
                    </Typography>
                    <NextLink href='/checkout' passHref>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </NextLink>
                  </Box>
                  <Typography variant='body1' gutterBottom>
                    Name: {shippingDetails.name}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    Address: {shippingDetails.address}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    City: {shippingDetails.city}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    country: {shippingDetails.country}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    postal code: {shippingDetails.postalCode}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='h5' gutterBottom>
                      Payment details
                    </Typography>
                    <NextLink href='/checkout/payment' passHref>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </NextLink>
                  </Box>
                  <Typography variant='body1' gutterBottom>
                    Payment method: {getPaymentMethodLabel(paymentMethod)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='h5' gutterBottom>
                      Order items
                    </Typography>
                    <NextLink href='/cart' passHref>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </NextLink>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align='right'>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextImage
                                src={item.image}
                                width={86}
                                height={86}
                                objectFit='contain'
                                alt={item.name}
                              />
                            </TableCell>
                            <TableCell>
                              <NextLink
                                passHref
                                href={`/products/${item.slug}`}
                              >
                                <a>{item.name}</a>
                              </NextLink>
                            </TableCell>
                            <TableCell align='right'>
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
                <Typography variant='h5'>Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>${shippingPrice}</Typography>
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
                    <Typography align='right'>
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={handleOrder}
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Confirm;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cartItems = req.cookies.cartItems
    ? JSON.parse(req.cookies.cartItems)
    : [];

  const shippingDetails = req.cookies.shippingDetails
    ? JSON.parse(req.cookies.shippingDetails)
    : {};

  const paymentMethod = req.cookies.paymentMethod;

  return {
    props: {
      cartItems,
      shippingDetails,
      paymentMethod,
    },
  };
};
