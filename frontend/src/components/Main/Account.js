import React from 'react';
import { Typography, 
         Button, 
         TextField, 
         Grid } from 'material-ui';
import AuthService from './AuthService.js';
const jwt = require('jsonwebtoken');
const Auth = new AuthService();

export default class Account extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
        editField: null,
        token: jwt.decode(Auth.getToken()),
      };
      this.handleChange = this.handleChange.bind(this);
      //this.handleFormSubmit = this.handleFormSubmit.bind(this);
      //this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
  }
    
  render() {
    const { classes } = this.props;
    let token = jwt.decode(Auth.getToken());
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Typography align="center">
            {/*<h3>Change Information About Your Account</h3>*/}
            <Grid container wrap="noWrap" spacing={40}>
              <Grid item xs={12} sm={6}>
                <form>
                  <h2>Change Username</h2>
                  <TextField
                    placeHolder="Change Username"
                    defaultValue={token.username}
                    name="username"
                    type="text"
                    label="Username"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <h2>Change First Name</h2>
                  <TextField
                    placeHolder="Change First Name"
                    defaultValue={token.firstName}
                    name="username"
                    type="text"
                    label="First Name"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <h2>Change Last Name</h2>
                  <TextField
                    placeHolder="Change Last Name"
                    defaultValue={token.lastName}
                    name="username"
                    type="text"
                    label="Last Name"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <h2>Change Email</h2>
                  <TextField
                    placeHolder="Change Email"
                    defaultValue={token.email}
                    name="username"
                    type="text"
                    label="Email"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <Button
                    type="submit"
                    className={classes.submitButton}
                    primary={true}
                    onClick={this.handleFormSubmit}
                  >
                    <b>Submit</b>
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} sm={6}>
                <form>
                  <h2>Change Password</h2>
                  <TextField
                    placeHolder="Change Password"
                    name="password"
                    type="password"
                    label="New Password"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <TextField
                    placeHolder="Verify Password"
                    name="passwordCheck"
                    type="password"
                    label="Verify Password"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <Button
                    type="submit"
                    className={classes.submitButton}
                    primary={true}
                    onClick={this.handlePasswordSubmit}
                  >
                    <b>Submit</b>
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Typography>
      </main>
    );
  }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleFormSubmit(e) {
      //TODO
      e.preventDefault();

    }

    handlePasswordSubmit(e) {
      //TODO
      e.preventDefault();

    }
}
