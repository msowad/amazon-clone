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
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileMenu from '../ProfileMenu';
import Logo from './Logo';

interface Props {
  //
}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const cartItemLength = useSelector(selectCartLength);
  const darkMode = useSelector(selectColorMode);
  const { data: session, status } = useSession();

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
          <IconButton sx={{ mr: 1 }} aria-label='cart' className='link'>
            <Badge
              className='badge'
              badgeContent={cartItemLength}
              color='secondary'
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Link>
        {status !== 'loading' && session ? (
          <ProfileMenu session={session} />
        ) : (
          <Link href='/auth/login' passHref>
            <Button className='link'>login</Button>
          </Link>
        )}
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => dispatch(toggleMode())}
          className='link'
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
