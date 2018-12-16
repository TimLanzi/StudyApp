//createFlashcard.js
import React from "react";
//import form from "material-ui/Form";
import AuthService from "../../AuthService";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import NewButton from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";

const Auth = new AuthService();
var Latex = require('react-latex');

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 100,
    paddingBottom: 16,
    //marginTop: theme.spacing.unit * 3,
    marginTop: -100,
    backgroundColor: "#ffffff"
  })
});

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      cardNum: (Math.floor(Math.random() * 69) + 1),
      prevCard: null,
      //Sets state of the Frame component to have no active user.
      front: true
    };
  }

  getCardNum()
    {
        this.state.prevCard = this.state.cardNum;
        this.state.cardNum = Math.floor(Math.random() * 69) + 1;
        return this.state.cardNum;
    }

    setContents(newContents)
    {
        this.state.contents = newContents;
    }

    
  //to toggle between question and answer
  toggleSide = () => {
    this.setState({ front: this.state.front ? false : true });
    console.log(this.state.front);
    this.render();
    console.log("Flipped");
  };

  componentDidMount(){
    fetch("http://165.227.198.233:3001/getFlashcard/" + Auth.getToken())
      .then(res => res.json())
      .then(contents => this.setState({contents}));
  }

  render() {
    const { classes } = this.props;
    if (this.state.front && Auth.loggedIn())
    {
    return (
      <main className={classes.content} align="center" Style={styles}>
        <div className={classes.toolbar} />
        <Card raised className={classes.card}>
          <CardContent>
            <Typography variant="headline" align="center" component="h3">
            <strong>FLIP TO CARD BACK</strong>
            {this.state.contents.map(content => (
               <div key={content.id}>
                <strong>{content.frontText}</strong>
               </div>
            ))}
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
        <br/>
          <NewButton color="primary" button component={Link} to="/createFlashcard">
            <AddIcon/> Add New Flashcard
          </NewButton>
      </main>
      
    );
  }
  else if (!this.state.front && Auth.loggedIn()){
    return (
      <main className={classes.content} align="center" Style={styles}>
        <div className={classes.toolbar} />
        <Card raised className={classes.card}>
          <CardContent>
            <Typography variant="headline" align="center" component="h3">
            <strong>FLIP TO CARD FRONT</strong>
            {this.state.contents.map(content => (
               <div key={content.id}>
                <strong>{content.backText}</strong>
               </div>
            ))}
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
        <br/>
          <NewButton color="primary" button component={Link} to="/createFlashcard">
            <AddIcon/> Add New Flashcard
          </NewButton>
      </main>
      
    );
  }
  }
}