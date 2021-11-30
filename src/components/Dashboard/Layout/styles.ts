import { styled } from '@mui/material';

const drawerWidth = 200;

export const StyledLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  '.appBar': {
    zIndex: theme.zIndex.drawer - 1,
    [theme.breakpoints.up('md')]: {
      zIndex: theme.zIndex.drawer + 1,
    },
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.paper,
    '.link': {
      color: theme.palette.getContrastText(
        theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.background.paper
      ),
    },
  },
  '.drawer': {
    flexShrink: 0,
    width: drawerWidth,
  },
  '.drawerPaper': {
    width: drawerWidth,
  },
  '.menuButton': {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  '.toolbar': {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  '.main': {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  main: {
    paddingTop: 70,
  },
  '.footer-text': {
    marginTop: theme.spacing(12),
    color: theme.palette.text.secondary,
  },
}));
