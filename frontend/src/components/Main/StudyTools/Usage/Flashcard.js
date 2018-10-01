/*
  This file is the implementation of component of an individual flashcard
  Clicking on Flip changes the side of the card that is displayed
*/

import Card, { CardActions, CardContent } from "material-ui/Card";
import React from "react";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

export default class Flashcard extends React.Component {
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
        <div className={classes.toolbar} margin-top="-100px" />
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
}
