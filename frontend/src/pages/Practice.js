// import "../styles/katex.min.css"
import AuthService from  "../utils/AuthService";
import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, RadioGroup, FormControl, FormLabel, Button, Grid } from "@material-ui/core";
import Latex from 'react-latex';

const Auth = new AuthService();

// const styles = theme => ({
//   root: theme.mixins.gutters({
//     //paddingTop: "100px",
//     //paddingBottom: "16px",
//     // /marginTop: theme.spacing(3),
//     //backgroundColor: "#ffffff"
//   })
// });


export default class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      questionSide: true,
      problemNum: (Math.floor(Math.random() * 69) + 1),
      prevProb: null,
    };
  }

  getProblemNumber = () => {
      this.state.prevProb = this.state.problemNum;
      this.state.problemNum = Math.floor(Math.random() * 69) + 1;
      return this.state.problemNum;
  }

  setContents = (newContents) => {
      this.state.contents = newContents;
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getProblem/${this.state.problemNum}`)
      .then(res => res.json())
      .then(contents => this.setState({ contents}));
  }
  

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert("Answer submitted is: " + this.state.value);
    event.preventDefault();
  }

  toggleAns = (ans) => {
    this.setState({ questionSide: this.state.questionSide ? false : true });
    //console.log(this.state.questionSide);
    if (this.state.questionSide) {
        //console.log("before fetch");
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getProblem/${this.getProblemNumber()}`)
             .then(res => res.json())
             .then(contents => this.setContents(contents));
        //console.log("after fetch");
    } else {
      //console.log(Auth.getToken() + "'s answer for problem #" + (this.state.problemNum-1) + " is " + ans);
      var token = Auth.getToken();
      var problem = this.state.prevProb;
      fetch(`${process.env.REACT_APP_BACKEND_URL}/postResult`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
          token,
          problem,
          ans
        })
      }).then(res => console.log(res));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content} /*style={styles}*/>
        <div className={classes.toolbar} margin-top="-100px" />
        { this.state.questionSide && Auth.loggedIn() 
          ? this.question()
          : !this.state.questionSide && Auth.loggedIn()
          ? this.answer()
          : this.login()
        }
      </main>
    );
  }

  question = () => {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center" component="h3">
          { this.state.contents.map(content => (
            <div key={content.id}>
              <Latex>{content.question}</Latex>
            </div>
          ))}
          <br />
          <br />
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">
              When you are ready to see the answer, click "Show Answer".
            </FormLabel>
            <RadioGroup
              aria-label="answer"
              name="answer1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            />
            <br/>
          <div align="center">
            <Button
              variant="contained"
              className={classes.submitButton}
              textAlign="center"
              type=""
              value="next"
              onClick={() => this.toggleAns()}
            >
          <b>Show Answer</b>
          </Button>
          </div>
          </FormControl>
        </form>
      </Paper>
    );
  }

  answer = () => {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center" component="h3">
          {this.state.contents.map(content => (
            <div key={content.id}>
              <Latex>{"$"+content.solution+"$"}</Latex>
            </div>
          ))}<br/><br/>
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">
              Grade yourself based on how you feel you did. 
            </FormLabel><br/>
            <RadioGroup
              aria-label="answer"
              name="answer1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Grid container spacing={8} direction="row">
              <Grid item >
                <Button
                  variant="contained"
                  className={classes.oneButton}
                  type=""
                  value="next"
                  onClick={() => this.toggleAns(1)}
                >
                  <h3> 1 </h3> 
                </Button>
              </Grid>
              <Grid item >
                <Button
                  className={classes.twoButton}
                  type=""
                  value="next"
                  onClick={() => this.toggleAns(2)}
                >
                  <h3> 2 </h3>
                </Button>
              </Grid>
              <Grid item >
                <Button
                  className={classes.threeButton}
                  type=""
                  value="next"
                  onClick={() => this.toggleAns(3)}
                >
                  <h3> 3 </h3>
                </Button>
              </Grid>
              <Grid item >
                <Button
                  className={classes.fourButton}
                  type=""
                  value="next"
                  onClick={() => this.toggleAns(4)}
                >
                  <h3> 4 </h3>
                </Button>
              </Grid>
              <Grid item >
                <Button
                  className={classes.fiveButton}
                  type=""
                  value="next"
                  onClick={() => this.toggleAns(5)}
                >
                  <h3> 5 </h3>
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Paper>
    );
  }

  login = () => {
    const { classes } = this.props;
    return (
      <Typography variant="h5" align="center" component="h3">
        { this.state.contents.map(content => (
          <div key={content.id}>
            <strong>You are not logged in. Log in or create an account to start practicing!</strong>
          <br />
          <br />
          <Button
            component={Link} to="/login"
            className={classes.submitButton}
          >
            <b>Login or Register Now</b>
          </Button>
          </div> 
        ))}
      </Typography>
    )
  }
}