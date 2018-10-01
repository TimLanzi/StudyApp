import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "material-ui/Button";

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
    return (
      <main className={classes.content} Style="styles">
        <div className={classes.toolbar} margin-top="-100px" />
        <Paper className={classes.paper}>
          <Typography variant="headline" align="center" component="h3">
            {this.state.contents.map(content => (
              <div key={content.id}>
                <h3>{this.state.questionSide ? content.question : content.solution}</h3>
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
                {this.state.questionSide ? "Show Answer" : "Show Question"}
             </Button>
            </FormControl>
          </form>
        </Paper>
      </main>
    );
  }
}


