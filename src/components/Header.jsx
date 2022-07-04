import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { Container, Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../contexts/AuthContext';

export default function Header() {
  const { token, setToken } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container fixed>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>
          <Link
            href="#"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} color="inherit" underline="none">
            Profile
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link href="/products" color="inherit" underline="none">
            Products
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link href="/contact" color="inherit" underline="none">
            Contact
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link href="#"  onClick={logout} color="inherit" underline="none">
            Logout <LogoutIcon fontSize="inherit" />            
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
