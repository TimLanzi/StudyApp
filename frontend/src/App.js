/*
  This file acts as the central routing for the content area of the page.
*/
import React from "react";
import { Header, NavBar } from './components/layout';
import * as Pages from './pages';
import Flashcard from "./components/Main/StudyTools/Usage/Flashcard";
import Practice from "./components/Main/StudyTools/Usage/Practice";
import CreateFlashcard from "./components/Main/StudyTools/Usage/createFlashcard.js";
import CreateFlashcardSet from "./components/Main/StudyTools/Usage/createFlashcardSet.js";
import FlashcardLanding from "./components/Main/StudyTools/Landings/FlashcardLanding";
import Baseline from "./components/Main/StudyTools/Usage/Baseline";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import theme from "./styles/theme";
import AuthService from "./utils/AuthService";

const Auth = new AuthService();

// Stylesheet declarations used by the withStyles functions and the reason for the passing of { classes } down the component tree.
// Documentation for withStyles https://material-ui-next.com/customization/css-in-js/#withstyles-styles-options-higher-order-component
const styles = theme;

class App extends React.Component {
  constructor(props) {
    super(props); // Calls the constructor for the parent class (React.Component)
    this.state = {
      //Sets state of the Frame component to have no active user.
      username: null
    };
  }

  static contextTypes = {
    router: PropTypes.object,
  }
  
  handleLogout() {
    Auth.logout()
    this.propsi.router.history.replace('/login');
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <Header
            history={this.props.history}
            className={classes.appBar}
            classes={classes}
          />
          <NavBar
            history={this.props.history}
            className={classes.drawerPaper}
            classes={classes}
          />
          
          <Switch>
            <div className={classes.root}>
              <Route exact path="/">
                <Pages.About classes={classes} />
              </Route>

              <Route path='/flashcards'>
                <FlashcardLanding classes={classes} />
              </Route>
              
              <Route path='/flashcardSet/:id'>
                <Flashcard classes={classes} />
              </Route>

              <Route path='/practice'>
                <Practice classes={classes} />
              </Route>
              
              <Route path='/createFlashcard'>
                <CreateFlashcard classes={classes} />
              </Route>

              <Route path='/createFlashcardSet'>
                <CreateFlashcardSet classes={classes} />
              </Route>

              <Route path='/baseline'>
                <Baseline classes={classes} />
              </Route>

              <Route path='/rankings'>
                <Pages.Rankings classes={classes} />
              </Route>

              <Route path='/login'>
                <Pages.Login history={this.props.history} classes={classes} />
              </Route>

              <Route path='/account'>
                <Pages.Account classes={classes} />
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
