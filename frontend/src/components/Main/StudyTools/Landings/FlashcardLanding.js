import React from "react";
// import Typography from "material-ui/Typography";
// import Grid from "material-ui/Grid";
// import Paper from "material-ui/Paper";
// import Button from "material-ui/Button";
// import ButtonIcon from "material-ui/Button";

import { Typography, Grid, Paper, Button, IconButton } from '@material-ui/core';
import { Add, Backup } from '@material-ui/icons';
// import AddIcon from "@material-ui/icons/NoteAdd";
// import SetIcon from "@material-ui/icons/Ballot";
import { Link } from "react-router-dom";
import AuthService from '../../AuthService';
const Auth =  new AuthService();

export class FlashcardLanding extends React.Component {
  //constructor
  constructor(props){
    super(props);
    this.state = {
        contents: []
    };
  }

  componentDidMount(){
    if (Auth.loggedIn())
    {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/getFlashcardSet/${Auth.getToken()}`)
      .then(res => res.json())
      .then(contents =>this.setState({ contents }));
    }
  }
  
  render() {
    const { classes } = this.props;
    if (Auth.loggedIn())
    {
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
              <Paper color="primary" className={classes.paper}>
                <IconButton button component={Link} to="/createFlashcardSet">
                  <Add />
                  <Typography align="center">
                    Create New Flashcard Set
                  </Typography>
                </IconButton>
              </Paper>
            </div>
          </Grid>
          {this.state.contents.map(content => (
            <Grid item xs={6}>
              <div key={content.setid}>
              <Paper className={classes.paper}>
                <IconButton color="primary" component={Link} to={{pathname: "/Flashcard", state: {setname: content.setname}}}>
                    <Backup />
                      {content.setname} Flashcard Set 
                </IconButton>
              </Paper>
              </div> 
            </Grid>
          ))} 
        </Grid>
      </main>
    );
  }else
  {
      return (
         <main className={classes.content} Style="styles">
           <div className={classes.toolbar} margin-top="-100px" />
               <Typography variant="headline" align="center" component="h3">
                      <strong>You are not logged in. Log in or create an account to start practicing!</strong>
                   <br />
                   <br />
                   <Button
                      component={Link} to="/login"
                      className={classes.submitButton}
                   >
                      <b>Login or Register Now</b>
                   </Button>      
               </Typography>
          </main>
      );
  }
  }
}

export default FlashcardLanding;

/*
{this.state.contents.map(content => (
                   <div key={content.id}>
</div> 
                  ))}
*/
