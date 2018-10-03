import React from "react";
import AuthService from "./AuthService";
import Typography from "material-ui/Typography";

const Auth = new AuthService();

class ExampleContent extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap>
          {Auth.loggedIn() ? "You are logged in: "+Auth.getProfile() : "You are not logged in" }
        </Typography>
      </main>
    );
  }
}

export default ExampleContent;
