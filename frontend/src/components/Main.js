/*
  This file acts as the central routing for the content area of the page.
*/
import FlashcardLanding from "./Main/StudyTools/Landings/FlashcardLanding";
import Login from "./Main/Login";
import About from "./Main/About";
import Flashcard from "./Main/StudyTools/Usage/Flashcard";
import PracticeQ from "./Main/StudyTools/Usage/Practice";
import React from "react";
import requireAuth from "../utils/requireAuth";
import { Route } from "react-router-dom";
//import AuthService from "./Main/AuthService";
//import withAuth from "./Main/withAuth";
//const Auth = new AuthService();

class Main extends React.Component {
   constructor(props)
   {
       super(props);
   }
   
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Route
          exact
          path="/" // An example of passing props to a component as it is rendered by the router
          render={() => <About classes={classes} />}
          onEnter={requireAuth} //Require Auth not coded
        />
        <Route
          path="/FlashcardLanding" // An example of passing props to a component as it is rendered by the router
          render={() => <FlashcardLanding classes={classes} />}
        />
        <Route
          path="/flashcards"
          render={() => <Flashcard classes={classes} />}
        />
        <Route
          path="/practiceQ"
          render={() => <PracticeQ classes={classes} />}
        />
        <Route path="/login" render={() => <Login history={this.props.history} classes={classes} />} />
        <Route path="/logout" />
        <Route path="/checkout" />
      </div>
    );
  }
}

export default Main;
