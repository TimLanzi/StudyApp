import "../../../../../node_modules/katex/dist/katex.min.css"
import AuthService from  "../../../../utils/AuthService";
import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, RadioGroup, FormControl, FormLabel, Button, Grid } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import Button from "material-ui/Button";
// import Grid from "material-ui/Grid";

const Auth = new AuthService();

var Latex = require('react-latex');

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 100,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#ffffff"
  })
});

export default class Baseline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      questionSide: true,
      problemNum: 0,
      prevProb: null,
      problemNumbers: [],
    };
}
    getProblemNumber()
    {
        this.state.prevProb = this.state.problemNumbers[this.state.problemNum].problem_id;
        this.state.problemNum = this.state.problemNum + 1;
        return this.state.problemNum;
    }

    setContents(newContents)
    {
        this.state.contents = newContents;
    }

    setProblemNumbers(problems){
        this.state.problemNumbers = problems;
    }

    componentDidMount(){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/getBaseline/`)
        .then(res => res.json())
        .then(problemNumbers => {
          var temp = [];
          console.log(problemNumbers);
          for(var i = 0; i < 15; i++){
            temp.push(problemNumbers[i]);
          }
          this.setProblemNumbers(temp);
        })
        .then(() => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/getProblem/${this.state.problemNumbers[this.state.problemNum].problem_id}`)
             .then(res => res.json())
             .then(newContent => {
               this.setState({contents: newContent});
              });
        });

    }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Answer submitted is: " + this.state.value);
    event.preventDefault();
  }

  toggleAns(ans) {
    this.setState({ questionSide: this.state.questionSide ? false : true });
    console.log(this.state.questionSide);
    console.log(this.state.problemNum);
    if (this.state.questionSide)
    {
      if(this.state.problemNum < 15){
        //this.getProblemNumber();
        console.log("before fetch");
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getProblem/${this.state.problemNumbers[this.state.problemNum].problem_id}`)
              .then(res => res.json())
              .then(contents => this.setContents(contents))
              .then(() => this.getProblemNumber());
        console.log("after fetch");
      }
    }
    else
    {
      console.log(Auth.getToken() + "'s answer for problem #" + (this.state.problemNum-1) + " is " + ans);
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
//    this.getProblemNumber();
    if(this.state.problemNum < 15){
      if (this.state.questionSide && Auth.loggedIn())
      {
      return (
        <main className={classes.content} Style="styles">
          <div className={classes.toolbar} margin-top="-100px" />
          <Paper className={classes.paper}>
            <Typography variant="headline" align="center" component="h3">
              {this.state.contents.map(content => (
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
                required
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
                <Button
                  className={classes.nextQ}
                  type=""
                  value="next"
                  onClick={() => this.toggleAns()}
                >
                  Show Answer
              </Button>
              </FormControl>
            </form>
          </Paper>
        </main>
      );
      }
      else if(!this.state.questionSide && Auth.loggedIn())
      {
      return (
        <main className={classes.content} Style="style s">
          <div className={classes.toolbar} margin-top="-100px" />
          <Paper className={classes.paper}>
            <Typography variant="headline" align="center" component="h3">
              {this.state.contents.map(content => (
                <div key={content.id}>
                  <Latex>{"$"+content.solution+"$"}</Latex>
                </div>
              ))}
              <br />
              <br />
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <FormControl
                component="fieldset"
                required
                className={classes.formControl}
              >
                <FormLabel component="legend">
                Grade youself based on how you feel you did.
                </FormLabel>
                <br />
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
        </main>
      );

      }
      else
      {
          return (
            <main className={classes.content} Style="styles">
              <div className={classes.toolbar} margin-top="-100px" />
                  <Typography variant="headline" align="center" component="h3">
                      {this.state.contents.map(content => (
                      <div key={content.id}>
                          You are not logged in. Log in or create an account to start practicing!
                      <br />
                      <br />
                      <Button component={Link} to="/login">
                          Login or Register Now
                      </Button>
                      </div>
                      ))}
                  </Typography>
              </main>
          );
      }
    }
    else{
      return (
        <main className={classes.content} Style="styles">
          <div className={classes.toolbar} margin-top="-100px" />
              <Typography variant="headline" align="center" component="h3">
                  {this.state.contents.map(content => (
                  <div key={content.id}>
                      You've completed the Baseline Exam!
                  <br />
                  <br />
                  <Button component={Link} to="/login">
                      Login or Register Now
                  </Button>
                  </div>
                  ))}
              </Typography>
          </main>
      );
    }
  }
}

