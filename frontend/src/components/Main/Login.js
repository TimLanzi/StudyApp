import React from "react";
import Typography from "material-ui/Typography";

class ExampleContent extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content} >

        <div className={classes.toolbar} />
        <Typography noWrap>
          {"You think water moves fast? You should see ice."}
        </Typography>
      </main>
    );
  }
}

export default ExampleContent;
