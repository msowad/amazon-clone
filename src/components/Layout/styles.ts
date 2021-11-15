import { styled } from '@mui/system';

export const StyledLayout = styled('div')(({ theme }) => ({
  '.appbar': {
    backgroundColor: theme.palette.primary.dark,
    '.link': {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  },
  '.main': {
    minHeight: '75vh',
    '.content': {
      padding: '50px 0',
    },
  },
  '.footer': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '.logo-container': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.text': {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
  },
}));
