import { Layout } from '@/src/components/Layout';
import { data } from '@/src/utils/data';
import { ErrorOutlineRounded, NavigateNext } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  product?: {
    id: number;
    name: string;
    brand: string;
    category: string;
    countInStock: number;
    description: string;
    image: string;
    numReviews: number;
    price: number;
    rating: number;
    slug: string;
  };
};

const Product: NextPage<Props> = ({ product }) => {
  const breadcrumbs = [
    <NextLink href='/' passHref key='1'>
      <Link underline='hover' color='inherit'>
        All Products
      </Link>
    </NextLink>,
    <Typography key='2' color='text.primary'>
      {product?.name || 'Product Not found'}
    </Typography>,
  ];

  return (
    <Layout
      title={product?.name || 'Product not found'}
      description={product?.description}
    >
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNext fontSize='small' />}
          aria-label='breadcrumb'
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>

      {!product ? (
        <Container maxWidth='sm'>
          <Alert
            severity='error'
            elevation={3}
            icon={<ErrorOutlineRounded fontSize='large' />}
          >
            <AlertTitle>Product Not found</AlertTitle>
            <NextLink href='/'> Check out all product</NextLink>
          </Alert>
        </Container>
      ) : (
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={4}>
              <Image
                src={product.image}
                width={640}
                height={640}
                layout='responsive'
                objectFit='contain'
                alt={product.name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h5' gutterBottom>
                {product.name}
              </Typography>
              <Box display='flex' alignItems='center' marginBottom={1}>
                <Rating
                  name='read-only'
                  value={product.rating}
                  readOnly
                  precision={0.5}
                />
                <Divider
                  style={{ margin: '0 10px' }}
                  orientation='vertical'
                  flexItem
                />
                <Typography variant='body1'>
                  {product.numReviews} Reviews
                </Typography>
              </Box>
              <Divider />
              <List dense>
                <ListItem>
                  <Typography variant='subtitle2'>
                    Category: {product.category}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='subtitle2'>
                    Brand: {product.brand}
                  </Typography>
                </ListItem>
              </List>
              <Divider />
              <Typography
                sx={{ fontWeight: 500, marginTop: 1 }}
                variant='subtitle1'
                gutterBottom
              >
                About this product
              </Typography>
              <Typography variant='body1'>{product.description}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <List dense>
                    <ListItem>
                      <Typography variant='subtitle2'>
                        Price:
                        <span> $</span>
                        {product.price}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant='subtitle2'>
                        Status:
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                    </ListItem>
                  </List>
                  <Button
                    disabled={product.countInStock < 1}
                    color='secondary'
                    fullWidth
                    variant='contained'
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const product = data.products.find((p) => p.slug === query.slug) || null;

  return {
    props: {
      product,
    },
  };
};
