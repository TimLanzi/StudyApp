//createFlashcardSet.js
import React from "react";
//import form from "material-ui/Form";
import AuthService from "../../AuthService";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "material-ui/Button";
import NewButton from '@material-ui/core/Button';


const Auth = new AuthService();

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 100,
    paddingBottom: 16,
    //marginTop: theme.spacing.unit * 3,
    marginTop: -100,
    backgroundColor: "#ffffff"
  })
});

export default class CreateFlashcardSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //for event handling
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    var token = Auth.getToken();
    var name = this.state.name;
    fetch("http://165.227.198.233:3001/postFlashcardSet", {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body: JSON.stringify({
            token,name
        })
    }).then(res => console.log(res));
            
    alert("NEW FLASHCARD SET ADDED");
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content} align="center" Style={styles}>
        <div className={classes.toolbar} />
        <Grid container spacing={24}>
        <Grid>
          <NewButton color="primary" button component={Link} to="/FlashcardLanding">
          <Button
              color="primary"
              variant="raised"
              size="large"
              className={classes.cardButton}
            >   
              Back To Flashcards
            </Button>
          </NewButton>
          </Grid>
          <Grid item xs={6}>
        <Paper className={classes.paper}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <Typography align="center">
            New Flashcard Set Name
            <br />
            <textarea
              rows="4"
              name="name"
              required
              type="text"
              placeholder={"Name of new flashcard set"}
              value={this.state.name}
              onChange={this.handleChange}
            />
            </Typography>
          </label>
          <br />
          <Button
              color="primary"
              variant="raised"
              size="large"
              className={classes.cardButton} 
              type="submit" >
                Add New Flashcard Set
          </Button>
        </form>
      </Paper>
      </Grid>
      </Grid>
    </main>
    );
    }
}
