import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 100,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

export default class PracticeQ extends React.Component {
  constructor() {
    super(); // Calls the constructor for the parent class (React.Component)
    this.state = {
      //Sets state of the Frame component to have no active user.
      front: true
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content} Style="styles">
        <div className={classes.toolbar} />
        <Paper className={classes.content} elevation={4}>
          <Typography variant="headline" align="center" component="h3">
            This is where the questions - like find d/dx x+2 - will go
          </Typography>
          <Typography component="p">bOi YoU beTTeR gEt thIs RigHT</Typography>
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">Answer</FormLabel>
            <RadioGroup
              aria-label="answer"
              name="answer1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="Option1"
                control={<Radio />}
                label="Option1"
              />
              <FormControlLabel
                value="Option2"
                control={<Radio />}
                label="Option2"
              />
              <FormControlLabel
                value="Option 3"
                control={<Radio />}
                label="Option 3"
              />
              <FormControlLabel
                value="Disabled"
                disabled
                control={<Radio />}
                label="Must select an option"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      </main>
    );
  }
}

/*
import Card, { CardActions, CardContent } from "material-ui/Card";
import React from "react";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

export default class PracticeQ extends React.Component {
  constructor() {
    super(); // Calls the constructor for the parent class (React.Component)
    this.state = {
      //Sets state of the Frame component to have no active user.
      front: true
    };
  }

  toggleSide = () => {
    this.setState({ front: this.state.front ? false : true });
    console.log("Flipped");
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card raised className={classes.card}>
          <CardContent>
            <Typography variant="display2" align="center">
              {this.state.front.toString().toLocaleUpperCase()}
              {this.state.front ? this.props.frontTitle : this.props.backTitle}
            </Typography>
            <br />
            <Typography variant="display1" align="center">
              The state value is displayed above
              {this.state.front
                ? this.props.frontContent
                : this.props.backContent}
            </Typography>
          </CardContent>
          <br />
          <CardActions className={classes.cardButtons}>
            <Button
              variant="raised"
              size="large"
              className={classes.cardButton}
            >
              Previous
            </Button>
            <Button
              variant="raised"
              size="large"
              className={classes.cardButton}
              onClick={this.toggleSide}
            >
              Flip
            </Button>
            <Button
              variant="raised"
              size="large"
              className={classes.cardButton}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      </main>
    );
  }
}*/
