import { selectColorMode } from "@/src/app/colorMode";
import { theme } from "@/src/mui/theme";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, responsiveFontSizes } from "@mui/material";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { StyledLayout } from "./styles";

interface Props {
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = ({ title, children, description }) => {
  const darkMode = useSelector(selectColorMode);
  const appTheme = theme(darkMode);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (event: KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  return (
    <>
      <Head>
        <title>
          {title ? `${title} - ` : ""}Dashboard - Next.js Amazon Clone
        </title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={responsiveFontSizes(appTheme)}>
        <CssBaseline />
        <NextNProgress color={appTheme.palette.secondary.light} />
        <StyledLayout>
          <Header toggleDrawer={() => setOpen(!open)} />
          <Sidebar open={open} toggleDrawer={toggleDrawer} />
          <Container className="main">
            <main className="content">{children}</main>
            <Footer />
          </Container>
        </StyledLayout>
      </ThemeProvider>
    </>
  );
};

export default Layout;
