import { styled } from "@mui/system";

export const StyledLayout = styled("div")(({ theme }) => ({
  ".appbar": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.background.paper,
    ".link": {
      color: theme.palette.getContrastText(
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.background.paper
      ),
    },
  },
  ".main": {
    minHeight: "75vh",
    ".content": {
      padding: "50px 0",
    },
  },
  ".footer": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.background.paper,
    color: theme.palette.getContrastText(
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.background.paper
    ),
    ".logo-container": {
      display: "flex",
      justifyContent: "center",
    },
    ".text": {
      textAlign: "center",
      marginTop: theme.spacing(2),
    },
  },
}));
