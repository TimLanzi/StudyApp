import React from "react";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/NoteAdd";
import { Link } from "react-router-dom";

class FlashcardLanding extends React.Component {
  //constructor
  constructor(props){
    super(props);
    this.state = {
        contents: []
    };
  }

  componentDidMount(){
    fetch("http://165.227.198.233:3001/getFlashcardSet")
    .then(res => res.json())
    .then(contents =>this.setState({ contents }));
  }
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
            <div>
              <Paper className={classes.paper}>
                <ButtonIcon button component={Link} to="/createFlashcardSet">
                  <AddIcon />
                  <Typography align="center">
                    Create New Flashcard Set
                  </Typography>
                </ButtonIcon>
              </Paper>
            </div>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ButtonIcon component={Link} to="">
                <Typography align="center">View current flashcards</Typography>
              </ButtonIcon>
            </Paper>
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
        {this.state.contents.map(flashcardSets => (
            <li key={flashcardSets.id}>
                {flashcardSets.name}
            </li>
        ))}
      </main>
    );
  }
}

export default FlashcardLanding;

