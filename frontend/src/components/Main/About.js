import React from "react";
import { Typography,
         Paper,
         Grid } from "material-ui";
import YouTube from 'react-youtube';
import AuthService from "./AuthService";
const Auth = new AuthService();
const jwt = require('jsonwebtoken');

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       videos: [],
     }
  }

  componentDidMount() {
    fetch('http://165.227.198.233:3001/getVideos')
      .then(res => res.json())
      .then(videos => this.setState({videos}));
  }

  _onReady(event) {
    event.target.pauseVideo();
  }

  render() {
    const { classes } = this.props;
    //console.log(this.state.videos[0]);
    let videos = this.state.videos;
    videos = videos.map(function(item) {
      return item.address.toString();
    });
    //console.log(videos);

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography align="center">
          <h1>
            {Auth.loggedIn() ? `Welcome to StudyApp, ${jwt.decode(Auth.getToken()).username}!` : "Welcome to StudyApp! Create an account to get started!" }
          </h1>
          <br/><br/>
          {/*<p>
            <strong>
            Paragraph about our purpose for the website.
            </strong>
          </p>*/}
          <br/>
          <h2>Check out some resources from YouTube</h2>
          <hr/>
          <br/>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <YouTube
                  videoId={videos[0]}
                  onReady={this._onReady}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <YouTube
                    videoId={videos[1]}
                    onReady={this._onReady}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <YouTube
                    videoId={videos[2]}
                    onReady={this._onReady}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <YouTube
                    videoId={videos[3]}
                    onReady={this._onReady}
                />
              </Paper>
            </Grid>
          </Grid>
          <br/>
          <strong>For more resources click <a href="//www.youtube.com/watch?v=dQw4w9WgXcQ">here</a></strong>
        </Typography>
      </main>
    );
  }
}
