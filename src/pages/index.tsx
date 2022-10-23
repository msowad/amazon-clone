import AddToCart from "@/src/components/AddToCart";
import { Layout } from "@/src/components/Layout";
import PaginationLink from "@/src/components/PaginationLink";
import { PaginatedResponse } from "@/src/types/PaginatedResponse";
import { Product } from "@/src/types/Product";
import axios from "@/src/utils/axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";
import { productImageProps } from "@/src/utils/product-image-props";

const Home: NextPage<{ data: PaginatedResponse<Product[]> }> = ({ data }) => {
  return (
    <Layout>
      <StyledGrid container spacing={3}>
        {data.docs?.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product._id}>
            <Card elevation={1}>
              <NextLink href={`/products/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia title={product.name}>
                    <NextImage
                      src={product.image}
                      alt={product.name}
                      {...productImageProps}
                    />
                  </CardMedia>
                  <CardContent>{product.name}</CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography className="price" variant="body2">
                  ${product.price}
                </Typography>
                <AddToCart
                  pid={product._id}
                  disabled={product.countInStock < 1}
                  size="small"
                  color="inherit"
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </StyledGrid>
      <Box marginTop={5} display="flex" justifyContent="center">
        <Pagination
          count={data.totalPages}
          size="large"
          renderItem={(item) => (
            <PaginationItem
              component={PaginationLink}
              href={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Box>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Number(query.page) || 1;
  const limit = 20;
  const field = "createdAt";
  const sort = "desc";
  const search = "";

  const { data } = await axios.get(
    `/products?page=${page}&limit=${limit}&field=${field}&sort=${sort}&search=${search}`
  );

  return {
    props: {
      data,
    },
  };
};

const StyledGrid = styled(Grid)(() => ({
  ".image-container": {
    width: "350px",
    height: "300px",
    position: "relative",
  },
  ".price": {
    marginRight: "10px",
  },
}));
