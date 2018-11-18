import React from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import AuthService from "./AuthService";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      front: true   // true = login side : false = register side
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService("http://165.227.198.233:3001");
  }

  static contextTypes = {
    router: PropTypes.object
  }

  toggleSide = () => {
    this.setState({ front: this.state.front ? false : true });
  }

  render() {
    const { classes } = this.props;
    /* Login block */
    if (this.state.front) {
    return (
      <main className={classes.content} Style="styles">
        <div className={classes.toolbar} margin-top="-100px" />
        <Paper className={classes.paper}>
          <Typography noWrap>
            <h1>Login</h1>
            <form>
              <TextField
                placeHolder="Enter Username"
                name="username"
                type="text"
                label="Username"
                onChange={this.handleChange}
              />
              <br/>
              <TextField
                placeHolder="Enter Password"
                name="password"
                type="password"
                label="Password"
                onChange={this.handleChange}
              />
              <br/>
              <Button type="submit" primary={true} onClick={this.handleFormSubmit}>Submit</Button>
              <br/>
              <br/>
              <FormLabel component="legend">
                Don't have an account? Click here to register!
              </FormLabel>
              <Button primary={true} onClick={this.toggleSide}>Register Now</Button>
            </form>
          </Typography>
        </Paper>
      </main>
    );
    }
    /* Register block */
    else
    {
     return (
      <main className={classes.content} Style="styles">
        <div className={classes.toolbar} margin-top="-100px" />
        <Paper className={classes.paper}>
          <Typography noWrap>
            <h1>Register</h1>
            <form>
              <TextField
                placeHolder="Enter Username"
                name="username"
                type="text"
                label="Username"
                onChange={this.handleChange}
              />
              <br/>
              <TextField
                placeHolder="Enter Password"
                name="password"
                type="password"
                label="Password"
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
              <Button type="submit" primary={true} onClick={this.handleFormSubmit}>Submit</Button>
              <br/>
              <br/>
              <FormLabel component="legend">
                Have an account? Click here to login!
              </FormLabel>
              <Button primary={true} onClick={this.toggleSide}>Login Now</Button>
            </form>
          </Typography>
        </Paper>
      </main>
    );
    }
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.context.router.history.push("/");
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    /* Login block */
    if (this.state.front === true)
    {
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.context.router.history.push("/");
      })
      .catch(err => {
        alert(err);
      });
    }
    /* Register block */
    else
    {
      if (!this.state.username || !this.state.password || !this.state.passwordCheck)
      {
        alert("One or more required fields are not filled in");
      }
      else if (this.state.password !== this.state.passwordCheck)
      {
        alert("Passwords do not match");
      }
      else
      {
        this.Auth.register(this.state.username, this.state.password)
          .then(res => {
            this.context.router.history.push("/");
          })
          .catch(err => {
            alert("User already registered");
          });
      }
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
}

export default Login;
