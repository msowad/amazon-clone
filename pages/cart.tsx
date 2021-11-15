import {
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  undoRemoveFromCart,
  updateQuantity,
} from '@/src/app/cart';
import Breadcrumb from '@/src/components/Breadcrumb';
import { Layout } from '@/src/components/Layout';
import { Product } from '@/src/types/Product';
import { Close, ErrorOutlineRounded } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  //
}

const Cart: React.FC<Props> = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const removeFromCartHandler = (product: Product) => {
    dispatch(removeFromCart(product));
    enqueueSnackbar(`"${product.name}" removed from cart`, {
      variant: 'success',
      action: (key) => (
        <>
          <Button
            color='inherit'
            onClick={() => {
              dispatch(undoRemoveFromCart(product._id));
              closeSnackbar(key);
            }}
          >
            undo
          </Button>
          <IconButton
            onClick={() => closeSnackbar(key)}
            key='close'
            aria-label='close'
            color='inherit'
          >
            <Close />
          </IconButton>
        </>
      ),
    });
  };

  return (
    <Layout title='Shopping cart'>
      <Breadcrumb
        current='Shopping cart'
        links={[{ href: '/', label: 'All products' }]}
      />
      {cartItems.length ? (
        <Grid container spacing={3} sx={{ marginTop: 5 }}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              Shopping cart
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Image
                          src={item.image}
                          width={86}
                          height={86}
                          objectFit='contain'
                          alt={item.name}
                        />
                      </TableCell>
                      <TableCell>
                        <NextLink passHref href={`/products/${item.slug}`}>
                          <a>{item.name}</a>
                        </NextLink>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                productId: item._id,
                                quantity: e.target.value as number,
                              })
                            )
                          }
                        >
                          {[
                            ...Array(item.countInStock + item.quantity).keys(),
                          ].map((i) => (
                            <MenuItem key={i} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>{item.price * item.quantity}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeFromCartHandler(item)}>
                          <Close />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <CardContent>
                <Alert severity='info' sx={{ marginBottom: 2 }}>
                  <AlertTitle>Total</AlertTitle>
                  <Typography>${totalPrice}</Typography>
                </Alert>
                <NextLink passHref href='/checkout'>
                  <Button fullWidth color='secondary' variant='contained'>
                    Checkout
                  </Button>
                </NextLink>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Container maxWidth='sm' sx={{ marginTop: 5 }}>
          <Alert
            severity='error'
            elevation={3}
            icon={<ErrorOutlineRounded fontSize='large' />}
          >
            <AlertTitle>No product in cart</AlertTitle>
            <NextLink href='/'> Continue shopping</NextLink>
          </Alert>
        </Container>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
