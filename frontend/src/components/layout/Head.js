import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { AccountCircle } from '@material-ui/icons'
import { AppBar, Toolbar, Typography, IconButton, Button} from '@material-ui/core';
import AuthService from "../../utils/AuthService";
const Auth = new AuthService();

class Head extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    auth: true,
    anchorEl: null
    };
  }
  
  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogout = (event) => {
    Auth.logout();
    this.context.router.history.push('/');
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    if (Auth.loggedIn())
    {
    return (
      <div>
        <AppBar className={this.props.className}>
          <Toolbar>
            <IconButton
              variant="h3"
              color="inherit"
              className={classes.logo}
              component={Link}
              to="/"
            >
              <AccountCircle />
             <h3> VOITHOS </h3>
            </IconButton>
            <Typography
              component="h3"
              variant="h3"
              color="initial"
              align="left"
              className={classes.flex}
            >
             {/* <h2> StudyApp </h2>*/}
                StudyApp
            </Typography>
            {auth && (
              <div>
                {/*
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  style={styles.iconSize}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >*/}
                  <Button color="inherit" component={Link} to="/rankings"><b>My Rankings</b></Button>
                  <Button color="inherit" component={Link} to="/account"><b>Account Settings</b></Button>
                  {/*<MenuItem button component={Link} to="/login">Login/Register</MenuItem>*/}
                  <Button color="inherit" onClick={this.handleLogout.bind(this)}><b>Logout</b></Button>
               {/* </Menu>*/}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
    }
    else
    {
    return (
      <div>
        <AppBar className={this.props.className}>
          <Toolbar>
            <IconButton
              variant="h3"
              color="inherit"
              className={classes.logo}
              component={Link}
              to="/"
            >
              <AccountCircle />
             <h3> VOITHOS </h3>
            </IconButton>
            <Typography
              component="h3"
              variant="h3"
              align="left"
              color="initial"
              className={classes.flex}
            >
             {/* <h2> StudyApp </h2>*/}
               <b> StudyApp</b>
            </Typography>
            {auth && (
              <div>
                {/*
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  style={styles.iconSize}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >*/}
                  {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>*/}
                  <Button color="inherit" component={Link} to="/login"> <b>Login / Register</b></Button>
                  {/*<MenuItem button onClick={this.handleLogout.bind(this)}>Logout</MenuItem>*/}
                {/*</Menu>*/}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );

    }
  }
}

export default Head;
