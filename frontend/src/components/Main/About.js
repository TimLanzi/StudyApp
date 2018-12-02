import React from "react";
import AuthService from "./AuthService";
import { Typography,
         Paper,
         Grid } from "material-ui";
import YouTube from 'react-youtube';
const Auth = new AuthService();
const jwt = require('jsonwebtoken');

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography align="center">
          <h1>
            {Auth.loggedIn() ? `Welcome to StudyApp, ${jwt.decode(Auth.getToken()).username}!` : "Welcome to StudyApp! Create an account to get started!" }
          </h1>
          <br/><br/>
          <h3>Check out some resources from YouTube</h3>
          <br/>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                videos go here
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                videos go here
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                videos go here
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                videos go here
              </Paper>
            </Grid>
          </Grid>
          <br/>
          <strong>For more resources click <a href="//www.youtube.com/watch?v=dQw4w9WgXcQ">here</a></strong>
        </Typography>
      </main>
    );
  }
}
