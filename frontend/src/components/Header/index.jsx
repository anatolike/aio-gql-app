import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useUser from "../../auth/hooks";
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import useNavigator from "../../hooks/useNavigator";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  link: {
    marginLeft: "24px",
  }
}));


const Header = () => {
  const classes = useStyles();
  const {user, logout} = useUser();
  const navigate = useNavigator();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar
      position="sticky"
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
           <Link
              component={RouterLink}
              color="inherit"
              to={'/'}
              className={classes.link}
            >
              Home
            </Link>
        </Typography>
        {user
          ? <React.Fragment>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handleClose}
              open={open}
            >
              <MenuItem onClick={() => navigate('/cabinet')}>Cabinet</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>

          </React.Fragment>
          : <React.Fragment>
            <Link
              component={RouterLink}
              color="inherit"
              to={'/login'}
              className={classes.link}
            >
              Login
            </Link>
            <Link
              component={RouterLink}
              color="inherit"
              to={'/registration'}
              className={classes.link}
            >
              Sign up
            </Link>
          </React.Fragment>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header
