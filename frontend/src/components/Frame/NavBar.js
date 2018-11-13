import React from "react";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import ShareIcon from "@material-ui/icons/Share";
import AssignIcon from "@material-ui/icons/Assignment";
import AssessIcon from "@material-ui/icons/Assessment";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={Link} to="/discover">
            <ListItemIcon>
              <ShareIcon />
            </ListItemIcon>
            <Typography align="left" className={classes.flex} variant="title">
              Discover
            </Typography>
          </ListItem>
          <ListItem button component={Link} to="/FlashcardLanding">
            <ListItemIcon>
              <AssignIcon />
            </ListItemIcon>
            <Typography variant="title">Flashcards</Typography>
          </ListItem>
          <ListItem button component={Link} to="/practiceQ">
            <ListItemIcon>
              <AssessIcon />
            </ListItemIcon>
            <Typography variant="title">Practice</Typography>
          </ListItem>
          <ListItem button component={Link} to="/baseline">
            <ListItemIcon>
              <AssignIcon />
            </ListItemIcon>
            <Typography variant="title">Baseline Test</Typography>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/Flashcards">
            <ListItemIcon>
              <AssignIcon />
            </ListItemIcon>
            <Typography variant="title">Flashcard set testing</Typography>
          </ListItem>
         {/* <ListItem button>
            <Typography variant="button">Button 5</Typography>
          </ListItem>
          <ListItem button>
            <Typography variant="button">Button 6</Typography>
          </ListItem>*/}
        </List>
      </Drawer>
    );
  }
}
