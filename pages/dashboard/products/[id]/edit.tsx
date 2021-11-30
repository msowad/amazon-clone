import { DashboardInfo, DashboardLayout } from '@/src/components/Dashboard';
import ProductForm from '@/src/components/Dashboard/Product/ProductForm';
import { Product } from '@/src/types/Product';
import axios from '@/src/utils/axios';
import { AllOutSharp, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

interface Props {
  initialValues: Product;
}

const Edit: NextPage<Props> = ({ initialValues }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `/products/delete/${router.query.id}`
      );
      if (data.success === true) {
        enqueueSnackbar(data.message, { variant: 'success' });
        router.push('/dashboard/products');
      }
    } catch (error: any) {
      enqueueSnackbar(error.response.data.message || error.message, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <DashboardInfo
        title='Edit Product'
        icon={<AllOutSharp />}
        link='/dashboard/products'
        linkText='All products'
        prependAction={
          <LoadingButton
            loading={isLoading}
            onClick={deleteProduct}
            startIcon={<Delete />}
            color='error'
            variant='contained'
            size='small'
            sx={{ mr: 2 }}
          >
            Delete
          </LoadingButton>
        }
      />
      <ProductForm initialValues={initialValues} />
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
