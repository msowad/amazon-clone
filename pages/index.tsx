import { Layout } from '@/src/components/Layout';
import { Product } from '@/src/types/Product';
import axios from '@/src/utils/axios';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import type { NextPage } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
  return (
    <Layout>
      <StyledGrid container spacing={3}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card elevation={1}>
              <NextLink href={`/products/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia title={product.name}>
                    <div className='image-container'>
                      <NextImage
                        src={product.image}
                        alt={product.name}
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </CardMedia>
                  <CardContent>{product.name}</CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography className='price' variant='body2'>
                  ${product.price}
                </Typography>
                <Button size='small' color='inherit'>
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </StyledGrid>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data } = await axios.get('http://localhost:3000/api/products');

  return {
    props: {
      products: data,
    },
  };
}

const StyledGrid = styled(Grid)(() => ({
  '.image-container': {
    width: '350px',
    height: '300px',
    position: 'relative',
  },
  '.price': {
    marginRight: '10px',
  },
}));
