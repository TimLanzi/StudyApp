//createFlashcardSet.js
import React from "react";
//import form from "material-ui/Form";
import AuthService from "../../AuthService";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import ButtonIcon from "material-ui/Button";
import AddIcon from "@material-ui/icons/NoteAdd";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
    return (
      <main align="center" Style={styles}>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            NEW FLASHCARD SET NAME:
            <br />
            <textarea
              rows="2"
              name="name"
              required
              type="text"
              placeholder={"Type in new flashcard set name"}
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Add New Flashcard Set" />
        </form>
    </main>
    );
    }
}
