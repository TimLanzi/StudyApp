/*
  This file acts as the central routing for the content area of the page.
*/
import FlashcardLanding from "./Main/StudyTools/Landings/FlashcardLanding";
import Login from "./Main/Login";
import About from "./Main/About";
import Rankings from "./Main/Rankings";
import Account from "./Main/Account";
import Flashcard from "./Main/StudyTools/Usage/Flashcard";
import PracticeQ from "./Main/StudyTools/Usage/Practice";
import CreateFlashcard from "./Main/StudyTools/Usage/createFlashcard.js";
import CreateFlashcardSet from "./Main/StudyTools/Usage/createFlashcardSet.js";
import Baseline from "./Main/StudyTools/Usage/Baseline";
import React from "react";
import requireAuth from "../utils/requireAuth";
import { Route } from "react-router-dom";

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
        />
        <Route
          path="/FlashcardLanding" // An example of passing props to a component as it is rendered by the router
          render={() => <FlashcardLanding classes={classes} />}
        />
        <Route
          path="/Flashcard"
          render={() => <Flashcard classes={classes} />}
        />
        <Route
          path="/practiceQ"
          render={() => <PracticeQ classes={classes} />}
        />
        <Route
          path="/createFlashcard"
          render={() => <CreateFlashcard classes={classes} />}
        />
        <Route
            path="/createFlashcardSet"
            render={() => <CreateFlashcardSet classes={classes} />}
        />
        <Route
          path="/baseline"
          render={() => <Baseline classes={classes} />}
        />
        <Route
          path="/rankings"
          render={() => <Rankings classes={classes} />}
        />
        <Route 
          path="/login" 
          render={() => <Login history={this.props.history} classes={classes} />} 
        />
        <Route
          path="/account"
          render={() => <Account classes={classes} />}
        />
        <Route path="/logout" />
        <Route path="/checkout" />
      </div>
    );
  }
}

export default Main;
