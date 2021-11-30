import {
  Collections,
  DashboardRounded,
  Group,
  Home,
  Inbox,
  Mail,
  Sell,
} from '@mui/icons-material';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { Fragment } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';

interface Props {
  open: boolean;
  toggleDrawer: (event: KeyboardEvent) => void;
}

const primaryLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardRounded />,
  },
  {
    href: '/dashboard/products',
    label: 'Products',
    icon: <Collections />,
  },
  {
    href: '/dashboard/orders',
    label: 'Orders',
    icon: <Sell />,
  },
];

const secondaryLinks = [
  {
    href: '/dashboard/users',
    label: 'Users',
    icon: <Group />,
  },
];

const Sidebar: React.FC<Props> = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();

  return (
    <Drawer
      className='drawer'
      variant={isMdUp ? 'permanent' : 'temporary'}
      classes={{
        paper: 'drawerPaper',
      }}
      anchor='left'
      open={open}
      onClose={toggleDrawer}
    >
      <div className='toolbar' />
      <Divider />
      <List>
        {[primaryLinks, secondaryLinks].map((links, index) => (
          <Fragment key={index}>
            {links.map((link) => (
              <NextLink href={link.href} key={link.href} passHref>
                <ListItem
                  selected={router.pathname === link.href}
                  dense
                  component='a'
                  button
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItem>
              </NextLink>
            ))}
            <Divider />
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
