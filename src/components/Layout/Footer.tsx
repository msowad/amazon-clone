import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "./Logo";

interface Props {
  //
}

const Footer: React.FC<Props> = () => {
  return (
    <Box
      padding={4}
      className="footer"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <div className="logo-container">
        <Logo large />
      </div>
      <Typography variant="body1" className="text">
        All rights reserved. Next.js amazon clone.
      </Typography>
    </Box>
  );
};

export default Footer;
