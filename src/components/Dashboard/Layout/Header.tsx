import { Logo } from '@/src/components/Layout';
import ModeSwitch from '@/src/components/ModeSwitch';
import ProfileMenu from '@/src/components/ProfileMenu';
import { Menu } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';

interface Props {
  toggleDrawer: () => void;
}

const Header: React.FC<Props> = ({ toggleDrawer }) => {
  const { data: session } = useSession();
  const [elevation, setElevation] = useState(0);

  useEffect(() => {
    return window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setElevation(5);
      } else {
        setElevation(0);
      }
    });
  }, []);

  return (
    <AppBar position='fixed' className='appBar' elevation={elevation}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={toggleDrawer}
          className='menuButton'
        >
          <Menu />
        </IconButton>
        <Typography variant='h6'>
          <NextLink href='/dashboard' passHref>
            <a>
              <Logo />
            </a>
          </NextLink>
        </Typography>
        <div className='spacer' />

        {session && <ProfileMenu session={session} />}
        <ModeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
