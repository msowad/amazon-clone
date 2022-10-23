declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements["img"]["style"]
>;

interface ProductImageProps {
  width?: number | string;
  height?: number | string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
  objectFit?: ImgElementStyle["objectFit"];
}

export const productImageProps: ProductImageProps = {
  width: "100%",
  height: "125%",
  layout: "responsive",
  objectFit: "cover",
};
