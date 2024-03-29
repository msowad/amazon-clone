import { AccountCircle, Dashboard, HistoryRounded } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import React from "react";

interface Props {
  session: Session;
}

const ProfileMenu: React.FC<Props> = ({ session }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
    enqueueSnackbar("You have been signed out.", {
      variant: "success",
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small">
            <Avatar sx={{ width: 32, height: 32, color: "#333" }}>
              {session.user?.name?.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box paddingX={2} paddingBottom={1}>
          <Typography variant="subtitle1">{session.user?.name}</Typography>
          <Typography variant="subtitle2">{session.user?.email}</Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <NextLink href="/profile" passHref>
          <MenuItem>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </NextLink>
        <NextLink href="/orders" passHref>
          <MenuItem>
            <ListItemIcon>
              <HistoryRounded fontSize="small" />
            </ListItemIcon>
            Order History
          </MenuItem>
        </NextLink>
        <Divider />
        {session?.user?.isAdmin && (
          <span>
            <NextLink href="/dashboard" passHref>
              <MenuItem>
                <ListItemIcon>
                  <Dashboard fontSize="small" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            </NextLink>
            <Divider />
          </span>
        )}
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
