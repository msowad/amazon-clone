import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import Logo from './Logo';

interface Props {
  //
}

const Header: React.FC<Props> = () => {
  return (
    <AppBar className='appbar' position='sticky'>
      <Toolbar className='toolbar'>
        <Typography variant='h6'>
          <Link href='/' passHref>
            <a>
              <Logo />
            </a>
          </Link>
        </Typography>
        <div className='spacer' />
        <Link href='/cart' passHref>
          <Button className='link'>cart</Button>
        </Link>
        <Link href='/' passHref>
          <Button className='link'>login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
