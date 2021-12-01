import { PaginationRenderItemParams } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';

const PaginationLink: React.FC<PaginationRenderItemParams & { href: string }> =
  (props) => {
    return (
      <NextLink href={props.href} passHref>
        <a {...props}>{props.children}</a>
      </NextLink>
    );
  };

export default PaginationLink;
