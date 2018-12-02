import React from 'react';
import PropTypes from 'prop-types';
import { Typography, 
         Button, 
         TextField, 
         Grid } from 'material-ui';
import AuthService from './AuthService.js';
const jwt = require('jsonwebtoken');

export default class Account extends React.Component {
  constructor(props) {
    super(props); 
      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
      this.Auth = new AuthService("http://165.227.198.233:3001");
      this.state = {
        username: jwt.decode(this.Auth.getToken()).username,
        firstName: jwt.decode(this.Auth.getToken()).firstName,
        lastName: jwt.decode(this.Auth.getToken()).lastName,
        email: jwt.decode(this.Auth.getToken()).email,
      };
  }
    
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Typography align="center">
            <Grid container wrap="noWrap" spacing={40}>
              <Grid item xs={12} sm={6}>
                <form>
                  <h2>Change First Name</h2>
                  <TextField
                    placeHolder="Change First Name"
                    defaultValue={this.state.firstName}
                    name="firstName"
                    type="text"
                    label="First Name"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <h2>Change Last Name</h2>
                  <TextField
                    placeHolder="Change Last Name"
                    defaultValue={this.state.lastName}
                    name="lastName"
                    type="text"
                    label="Last Name"
                    onChange={this.handleChange}
                  />
                  <br/>
                  <br/>
                  <h2>Change Email</h2>
                  <TextField
                    placeHolder="Change Email"
                    defaultValue={this.state.email}
                    name="email"
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
    console.log("Updating first name, last name, and email.");
    e.preventDefault();
    this.Auth.updateFields(this.state.firstName, this.state.lastName, this.state.email, this.state.username)
      .catch(err => {
        alert(err);
      });
  }

  handlePasswordSubmit(e) {
    console.log('Updating password.');
    e.preventDefault();

    if (!this.state.password || !this.state.passwordCheck) {
      alert('You must fill out both the password and the verify password fields.');
    }
    else if (this.state.password !== this.state.passwordCheck) {
      alert('Passwords do not match.');
    }
    else {
      this.Auth.updatePassword(this.state.password, this.state.username)
        .catch(err => {
          alert(err);
        });
    }
  }
}
