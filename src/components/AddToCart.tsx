import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/app/cart";
import axios from "@/src/utils/axios";
import NProgress from "nprogress";
import { useSnackbar } from "notistack";
import { Close } from "@mui/icons-material";

interface Props {
  pid: string;
  disabled: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
}

const AddToCart: React.FC<Props> = ({
  pid,
  disabled,
  color,
  fullWidth,
  variant,
  size,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAddToCart = async () => {
    if (pid) {
      NProgress.start();
      const { data } = await axios.post(`/products/${pid}?findById=true`);
      dispatch(addToCart(data));
      NProgress.done();
      enqueueSnackbar(`"${data.name}" added to cart`, {
        variant: "success",
        action: (key) => (
          <IconButton
            onClick={() => closeSnackbar(key)}
            key="close"
            aria-label="close"
            color="inherit"
          >
            <Close />
          </IconButton>
        ),
      });
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled}
      color={color}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
    >
      Add to cart
    </Button>
  );
};

export default AddToCart;
