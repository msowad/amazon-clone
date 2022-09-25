import { NavigateNext } from "@mui/icons-material";
import { Stack, Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import NextLink from "next/link";

interface link {
  href: string;
  label: string;
}

interface Props {
  links: link[];
  current: string;
}

const Breadcrumb: React.FC<Props> = ({ current, links }) => {
  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {links.map((link) => (
          <NextLink href={link.href} passHref key="1">
            <Link underline="hover" color="inherit">
              {link.label}
            </Link>
          </NextLink>
        ))}
        <Typography key="2" color="text.primary">
          {current}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export default Breadcrumb;
