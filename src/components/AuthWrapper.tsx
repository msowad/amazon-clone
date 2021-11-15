import { LockOutlined } from '@mui/icons-material';
import { Container, Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  title: string;
}

const AuthWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
        <Box sx={{ mt: 1 }}>{children}</Box>
      </Box>
    </Container>
  );
};

export default AuthWrapper;
