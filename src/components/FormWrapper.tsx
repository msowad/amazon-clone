import { Avatar, Container, styled, Typography } from "@mui/material";
import { Box, Breakpoint } from "@mui/system";
import React from "react";

interface Props {
  title: string;
  maxWidth?: Breakpoint | false;
  icon?: React.ReactNode;
}

const FormWrapper: React.FC<Props> = ({
  title,
  children,
  maxWidth = "xs",
  icon,
}) => {
  return (
    <Container component="main" maxWidth={maxWidth}>
      <StyledBox>
        {icon && (
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>{icon}</Avatar>
        )}
        <Typography
          sx={{ marginTop: icon ? 0 : 1 }}
          component="h1"
          variant="h5"
        >
          {title}
        </Typography>
        <Box sx={{ mt: 1 }}>{children}</Box>
      </StyledBox>
    </Container>
  );
};

export default FormWrapper;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "5px",
}));
