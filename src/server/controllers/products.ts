import db from "@/src/server/db";
import { ProductModel } from "@/src/server/model/Product";

export const getProducts = async (
  search: string,
  page: number,
  limit: number,
  field: string,
  sort: string
) => {
  await db.connect();
  const data = await ProductModel.paginate(
    {
      name: { $regex: search, $options: "i" },
    },
    { page, limit, sort: { [field]: sort } }
  );
  await db.disconnect();

  return data;
};
