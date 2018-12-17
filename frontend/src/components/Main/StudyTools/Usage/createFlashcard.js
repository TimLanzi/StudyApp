//createFlashcard.js
import React from "react";
//import form from "material-ui/Form";
import AuthService from "../../AuthService";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/Backspace";
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

export default class createFlashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: "",
      back: "",
      //setname: 
    };
    this.handleChangeF = this.handleChangeF.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //for card front event handling
  handleChangeF(event) {
    this.setState({ front: event.target.value });
  }

  //for card back event handling
  handleChangeB(event) {
    this.setState({ back: event.target.value });
  }

  handleSubmit(event) {
    var token = Auth.getToken();
    var front = this.state.front;
    //var { setname } = this.props.location.state;
    var back = this.state.back;
    //console.log(setname);
    fetch("http://165.227.198.233:3001/postFlashcard", {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body: JSON.stringify({
            token,front, back, 
        })
    }).then(res => console.log(res));
            
    alert("NEW FLASHCARD ADDED");
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content} align="center" Style={styles}>
        <div className={classes.toolbar} />
        <Grid container spacing={24}>
        <Grid>
          <NewButton color="primary" button component={Link} to="/Flashcard">
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
        <form onSubmit={this.handleSubmit}>
          <label>
          <Paper className={classes.paper}>
              <Typography variant="h3" align="center" component="h3">
              <strong>Flashcard Front</strong>
            <br />
            <textarea
              rows="4"
              name="question"
              required
              type="text"
              placeholder={"Type Front Text"}
              value={this.state.front}
              onChange={this.handleChangeF}
            />
            </Typography>
        </Paper>
          </label>
          <br />

          <Paper className={classes.paper}>
              <Typography variant="h3" align="center" component="h3">
          <label>
               Flashcard Back
              <br />
            <textarea
              rows="4"
              name="answer"
              required
              type="text"
              placeholder={"Type Back Text"}
              value={this.state.back}
              onChange={this.handleChangeB}
            />
          </label>
         
          </Typography>
        </Paper>
        <br />
        <Button
              color="primary"
              variant="raised"
              size="large"
              className={classes.cardButton} 
              type="submit" >
                Add Flashcard
          </Button>
        </form>
        </Grid>
        </Grid>
      </main>
    );
  }
}

