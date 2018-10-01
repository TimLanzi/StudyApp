import React from "react";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/NoteAdd";

class FlashcardLanding extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div className={classes.toolbar} />
        <Grid container spacing={24}>

          <Grid item xs={6}>
            <Paper>
              <ButtonIcon className={classes.flex} component={Link} to="/create/flashcards">
              <AddIcon/>
              <Typography align='center'>
                Create A new Flashcard Set
              </Typography>
            </ButtonIcon>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=6
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=6
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=3
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=3
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=3
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=3
            </Paper>
          </Grid>

        </Grid>
      </main>
    );
  }
}

export default FlashcardLanding;
