//practice question components
import React from "react";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
//import ActionFavorite from "material-ui/svg-icons/action/favorite";
//import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
//import Paper from "material-ui/Paper";
//import PropTypes from "prop-types";
//import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//import { Link } from "react-router-dom";
import Grid from "material-ui/Grid";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  height: 100,
  width: 100,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
});

class PracticeQLanding extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Grid item xs={6}>
          <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
              This is a sheet of paper.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </Grid>
        <div>
          <Grid item xs={3}>
            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
              <RadioButton
                value="light"
                label="Simple"
                style={styles.radioButton}
              />
            </RadioButtonGroup>
          </Grid>
        </div>
      </main>
    );
  }
}

/*
import React from "react";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/NoteAdd";


class PracticeQLanding extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <div className={classes.toolbar} />
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper>
              <ButtonIcon
                className={classes.flex}
                component={Link}
                to="/create/flashcards"
              >
                <AddIcon />
                <Typography align="center">
                  Create A new Flashcard Set
                </Typography>
              </ButtonIcon>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      </main>
    );
  }
}
*/

export default PracticeQLanding;
