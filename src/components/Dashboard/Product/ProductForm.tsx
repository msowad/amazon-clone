import Dropzone from '@/src/components/Dropzone';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { Form as FormikForm, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as yup from 'yup';

interface Props {
  initialValues: {
    name: string;
    description: string;
    price: number;
    countInStock: number;
    category: string;
    brand: string;
    image?: string;
  };
  handleSubmit: (arg: FormData) => void;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  countInStock: yup.number().required('Stock is required'),
  category: yup.string().required('Category is required'),
  brand: yup.string().required('Brand is required'),
});

const ProductForm: React.FC<Props> = ({ initialValues, handleSubmit }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        if (!file && !router.query.id) {
          enqueueSnackbar('Please select a file', { variant: 'error' });
          setSubmitting(false);
          return;
        }
        const formData = new FormData();
        file && formData.append('image', file);
        router.query.id && formData.append('id', router.query.id as string);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', String(values.price));
        formData.append('countInStock', String(values.countInStock));
        formData.append('category', values.category);
        formData.append('brand', values.brand);
        const data: any = await handleSubmit(formData);
        if (data.error?.data?.message) {
          enqueueSnackbar(data.error.data.message, { variant: 'error' });
        } else if (data.data?.success === true) {
          enqueueSnackbar('Product updated successfully', {
            variant: 'success',
          });
          router.push('/dashboard/products');
        } else {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <FormikForm onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name='name'
                label='Full name'
                variant='filled'
                autoFocus
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                name='category'
                label='Category'
                variant='filled'
                value={values.category}
                onChange={handleChange}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                name='brand'
                label='Brand'
                variant='filled'
                value={values.brand}
                onChange={handleChange}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                name='price'
                label='Price'
                variant='filled'
                type='number'
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                name='countInStock'
                label='Stock'
                variant='filled'
                type='number'
                value={values.countInStock}
                onChange={handleChange}
                error={touched.countInStock && Boolean(errors.countInStock)}
                helperText={touched.countInStock && errors.countInStock}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                name='description'
                label='Description'
                variant='filled'
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <Dropzone
                file={file}
                setFile={setFile}
                previousFile={initialValues.image}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={isSubmitting}
                fullWidth
                type='submit'
                color='primary'
                variant='contained'
              >
                {router.query.id ? 'Update product' : 'Add product'}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ProductForm;
