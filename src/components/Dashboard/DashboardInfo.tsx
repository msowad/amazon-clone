import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import React from 'react';

interface Props {
  title: string;
  icon?: React.ReactNode;
  prependAction?: React.ReactNode;
  linkText?: string;
  link?: string;
}

const DashboardInfo: React.FC<Props> = ({
  title,
  icon,
  link,
  linkText,
  prependAction,
}) => {
  return (
    <Box
      display='flex'
      marginBottom={5}
      justifyContent='space-between'
      alignItems='center'
    >
      <Typography component='h2' variant='h5' gutterBottom>
        {title}
      </Typography>
      <div>
        {prependAction}
        {linkText && link && (
          <NextLink href={link} passHref>
            <Button
              startIcon={icon}
              color='primary'
              variant='contained'
              size='small'
            >
              {linkText}
            </Button>
          </NextLink>
        )}
      </div>
    </Box>
  );
};

export default DashboardInfo;
