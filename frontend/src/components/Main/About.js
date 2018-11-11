import React from "react";
import AuthService from "./AuthService";
import Typography from "material-ui/Typography";

const Auth = new AuthService();
const jwt = require('jsonwebtoken');

class ExampleContent extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap align="center">
        <h1>
          {Auth.loggedIn() ? `Welcome, ${jwt.decode(Auth.getToken()).username}!` : "You are not logged in" }
        </h1>
        </Typography>
      </main>
    );
  }
}

export default ExampleContent;
