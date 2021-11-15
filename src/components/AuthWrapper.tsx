import { LockOutlined } from '@mui/icons-material';
import { Container, Avatar, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  title: string;
}

const AuthWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <Container component='main' maxWidth='xs'>
      <StyledBox>
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {title}
        </Typography>
        <Box sx={{ mt: 1 }}>{children}</Box>
      </StyledBox>
    </Container>
  );
};

export default AuthWrapper;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  padding: '20px',
  borderRadius: '5px',
}));
