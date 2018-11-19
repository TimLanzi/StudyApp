//TODO make the my account page
import React from 'react';
import Typography from "material-ui/Typography";

export default class Account extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography align="center">
                <h1>Work in progress</h1>
                </Typography>
            </main>
        );
    }
}
