/*
  This file composes the central components of our application into a Frame that will dynamically render the webpage.
*/
import Head from "./Frame/Head";
import Main from "./Main";
import NavBar from "./Frame/NavBar";
import PropTypes from "prop-types";
import React from "react";
import { Switch } from "react-router-dom";
import theme from "./theme";
import { withStyles } from "material-ui/styles";
import AuthService from "./Main/AuthService";

const Auth = new AuthService();

// Stylesheet declarations used by the withStyles functions and the reason for the passing of { classes } down the component tree.
// Documentation for withStyles https://material-ui-next.com/customization/css-in-js/#withstyles-styles-options-higher-order-component
const styles = theme;

class Frame extends React.Component {
  constructor(props) {
    super(props); // Calls the constructor for the parent class (React.Component)
    this.state = {
      //Sets state of the Frame component to have no active user.
      username: null
    };
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogout() {
    Auth.logout()
    this.propsi.router.history.replace('/login');
  }

  render() {
    const { classes } = this.props;

    return (
      /* This component encapsulates our central components, applying the CSS class root to it. */
      <div className={classes.root}>
        {/* This is the Header bar displayed at the top of everypage. */}
        <Head history={this.props.history} className={classes.appBar} classes={classes} />
        {/* The NavBar is the navigation center displayed on the left side of the webpage. */}
        <NavBar history={this.props.history} className={classes.drawerPaper} classes={classes} />
        {/* This component is used to hold Routes, but in this case We've encapsulated routing into the "Main" component */}
        <Switch>
          <Main history={this.props.history} classes={classes} />
        </Switch>
      </div>
    );
  }
}

Frame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Frame);
