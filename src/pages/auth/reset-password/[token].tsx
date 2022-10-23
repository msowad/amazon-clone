import FormWrapper from "@/src/components/FormWrapper";
import { Layout } from "@/src/components/Layout";
import axios from "@/src/utils/axios";
import { guestRoute } from "@/src/utils/guestRoute";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import React from "react";
import * as yup from "yup";

export const getServerSideProps = guestRoute(async () => {
  return { props: {} };
});

const validationSchema = yup.object({
  newPassword: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: any, setErrors: any) => {
    try {
      const { data } = await axios.post("/auth/change-password", {
        ...values,
        token: router.query.token,
      });

      if (data.user) {
        const result: any = await signIn("credentials", {
          redirect: false,
          email: data.user.email,
          password: data.user.password,
        });
        if (result?.error) {
          enqueueSnackbar(result.error, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Password changed successfully", {
            variant: "success",
          });
          router.push("/");
        }
      }
    } catch (error: any) {
      enqueueSnackbar(error.response.data.message || error.message, {
        variant: "error",
      });
    }
  };

  return (
    <Layout title="Change password">
      <FormWrapper title="Change password" icon={<LockOutlined />}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            await handleSubmit(values, setErrors);
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
            <Form onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                autoFocus
                fullWidth
                required
                name="newPassword"
                label="New Password"
                variant="filled"
                value={values.newPassword}
                onChange={handleChange}
                type="password"
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                name="confirmPassword"
                label="Confirm Password"
                variant="filled"
                value={values.confirmPassword}
                type="password"
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                change password
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Layout>
  );
};

export default ResetPassword;
