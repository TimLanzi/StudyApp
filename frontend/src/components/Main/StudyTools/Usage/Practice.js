import "../../../../../node_modules/katex/dist/katex.min.css"
import AuthService from  "../../AuthService";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";

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

export default class PracticeQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      questionSide: true,
        problemNum: 1
    };
}
    getProblemNumber()
    {
        this.state.problemNum = this.state.problemNum + 1;
        return this.state.problemNum;
    }

    setContents(newContents)
    {
        this.state.contents = newContents;
    }

    componentDidMount(){

    fetch("http://165.227.198.233:3001/getProblem/1")
      .then(res => res.json())
      .then(contents => this.setState({ contents}));
    }
  

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Answer submitted is: " + this.state.value);
    event.preventDefault();
  }

  toggleAns() {
    this.setState({ questionSide: this.state.questionSide ? false : true });
    console.log(this.state.questionSide);
    if (this.state.questionSide)
    {
        console.log("before fetch");
        fetch("http://165.227.198.233:3001/getProblem/"+this.getProblemNumber())
             .then(res => res.json())
             .then(contents => this.setContents(contents));
        console.log("after fetch");
    }
  }

  render() {
    const { classes } = this.props;
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
              <RadioGroup
                aria-label="answer"
                name="answer1"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              />
              <Grid container spacing={16}>
                <Grid item xs={5}>
                     <Button
                       className={classes.nextQ}
                       type=""
                       value="next"
                       onClick={() => this.toggleAns()}
                     >
                      1  
                     </Button>
                </Grid>
                <Grid item xs={5}>
                     <Button
                       className={classes.nextQ}
                       type=""
                       value="next"
                       onClick={() => this.toggleAns()}
                     >
                      2 
                     </Button>
                </Grid>
                <Grid item xs={5}>
                     <Button
                       className={classes.nextQ}
                       type=""
                       value="next"
                       onClick={() => this.toggleAns()}
                     >
                      3 
                     </Button>
                </Grid>
                <Grid item xs={5}>
                     <Button
                       className={classes.nextQ}
                       type=""
                       value="next"
                       onClick={() => this.toggleAns()}
                     >
                      4 
                     </Button>
                </Grid>
                <Grid item xs={5}>
                     <Button
                       className={classes.nextQ}
                       type=""
                       value="next"
                       onClick={() => this.toggleAns()}
                     >
                      5 
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
}

