import { selectCartLength, setCartFromCookies } from '@/src/app/cart';
import { selectColorMode, setMode, toggleMode } from '@/src/app/colorMode';
import { DarkMode, LightMode, ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';

interface Props {
  //
}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const cartItemLength = useSelector(selectCartLength);
  const darkMode = useSelector(selectColorMode);

  useEffect(() => {
    dispatch(setMode());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCartFromCookies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <IconButton aria-label='cart' className='link'>
            <StyledBadge badgeContent={cartItemLength} color='secondary'>
              <ShoppingCart />
            </StyledBadge>
          </IconButton>
        </Link>
        <Link href='/login' passHref>
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

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}));
