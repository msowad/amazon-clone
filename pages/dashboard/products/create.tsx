import { DashboardInfo, DashboardLayout } from "@/src/components/Dashboard";
import ProductForm from "@/src/components/Dashboard/Product/ProductForm";
import { useAddProductMutation } from "@/src/services/products";
import { AllOutSharp } from "@mui/icons-material";
import { NextPage } from "next";

interface Props {
  //
}

const initialValues = {
  name: "",
  description: "",
  price: 0,
  countInStock: 0,
  category: "",
  brand: "",
};

const Create: NextPage<Props> = () => {
  const [addProduct] = useAddProductMutation();

  return (
    <DashboardLayout title="Create product">
      <DashboardInfo
        title="Create New Product"
        icon={<AllOutSharp />}
        link="/dashboard/products"
        linkText="All products"
      />
      <ProductForm initialValues={initialValues} handleSubmit={addProduct} />
    </DashboardLayout>
  );
};

export default Create;
