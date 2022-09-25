import { Typography } from "@mui/material";
import React from "react";

interface Props {
  //
}

const Footer: React.FC<Props> = () => {
  return (
    <Typography textAlign="center" variant="body1" className="footer-text">
      All rights reserved. Next.js amazon clone.
    </Typography>
  );
};

export default Footer;
