import { DashboardInfo, DashboardLayout } from "@/src/components/Dashboard";
import ProductForm from "@/src/components/Dashboard/Product/ProductForm";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/src/services/products";
import { Product } from "@/src/types/Product";
import axios from "@/src/utils/axios";
import { AllOutSharp, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface Props {
  initialValues: Product;
}

const Edit: NextPage<Props> = ({ initialValues }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  return (
    <DashboardLayout title="Edit product">
      <DashboardInfo
        title="Edit Product"
        icon={<AllOutSharp />}
        link="/dashboard/products"
        linkText="All products"
        prependAction={
          <Button
            onClick={() => setOpen(true)}
            startIcon={<Delete />}
            color="error"
            variant="contained"
            size="small"
            sx={{ mr: 2 }}
          >
            Delete
          </Button>
        }
      />
      <ProductForm initialValues={initialValues} handleSubmit={updateProduct} />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Confirm delete"
        aria-describedby="Are you sure you want to delete this product?"
      >
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <LoadingButton
            autoFocus
            loading={isDeleting}
            onClick={async () => {
              await deleteProduct({ id: router.query.id as string });
              enqueueSnackbar("Product deleted", { variant: "success" });
              router.push("/dashboard/products");
            }}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axios.post(`/products/${query.id}?findById=true`);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialValues: data,
    },
  };
};
