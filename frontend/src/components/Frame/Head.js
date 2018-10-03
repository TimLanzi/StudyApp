import React from "react";
import PropTypes from 'prop-types';
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu, { MenuItem } from "material-ui/Menu";
import { Link, BrowserRouter } from "react-router-dom";
import ButtonBase from "material-ui/ButtonBase";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import HeadIcon from "@material-ui/icons/Public";
import AuthService from "../Main/AuthService";
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
//    window.location='/';
//      <Route exact path='/'/>
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

    return (
      <div>
        <AppBar className={this.props.className}>
          <Toolbar>
            <IconButton
              variant="title"
              color="inherit"
              className={classes.logo}
              component={Link}
              to="/"
            >
              <HeadIcon />
              VOITHOS
            </IconButton>
            <Typography
              variant="display1"
              align="center"
              className={classes.flex}
            >
              StudyApp
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
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
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem button component={Link} to="/login">Login/Register</MenuItem>
                  <MenuItem button onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Head;
