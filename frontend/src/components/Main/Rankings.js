import React from 'react';
import Typography from 'material-ui/Typography';
import AuthService from './AuthService';
const Auth = new AuthService();

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 100,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: "#ffffff"
    })
});

export default class Rankings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rankings:[],
        };
    }

    setRankings(rankings) {
        this.state.rankings = rankings;
    }

    componentDidMount() {
        fetch('http://165.227.198.233:3001/getRanking/'+Auth.getToken())
            .then(res => res.json())
            .then(rankings => this.setState({rankings}))
            .then(() => console.log(this.state.rankings));
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content} >
                <div className={classes.toolbar} margin-top='-100px' />
                <Typography noWrap align='center'>
                </Typography>
            </main>
        );
    }
}
