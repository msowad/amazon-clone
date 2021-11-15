import { selectColorMode, setMode, toggleMode } from '@/src/app/colorMode';
import { DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';

interface Props {
  //
}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectColorMode);

  useEffect(() => {
    dispatch(setMode());
  }, [dispatch]);

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
        <IconButton onClick={() => dispatch(toggleMode())} className='link'>
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
