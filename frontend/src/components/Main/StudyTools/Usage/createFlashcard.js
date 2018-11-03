//createFlashcard.js
import React from "react";
//import form from "material-ui/Form";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/NoteAdd";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
      question: "",
      answer: ""
    };

    this.handleChangeQ = this.handleChangeQ.bind(this);
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //for question event handling
  handleChangeQ(event) {
    this.setState({ question: event.target.value });
  }

  //for answer event handling
  handleChangeA(event) {
    this.setState({ answer: event.target.value });
  }

  handleSubmit(event) {
    alert("NEW FLASHCARD ADDED");
    event.preventDefault();
  }

  render() {
    return (
      <main align="center" Style={styles}>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            QUESTION:
            <br />
            <textarea
              rows="4"
              name="question"
              required
              type="text"
              placeholder={"Type in a question"}
              value={this.state.question}
              onChange={this.handleChangeQ}
            />
          </label>
          <br />
          <label>
            ANSWER:
            <br />
            <textarea
              rows="4"
              name="answer"
              required
              type="text"
              placeholder={"Type in an answer"}
              value={this.state.answer}
              onChange={this.handleChangeA}
            />
          </label>
          <br />
          <input type="submit" value="Add Flashcard" />
        </form>
      </main>
    );
  }
}

