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
            algebra:0,
            arithmetic:0,
            calculus:0,
            functions:0,
            geometry:0,
            logarithm:0,
            precalc:0,
            trigonometry:0,
            word_problem:0,
        };
    }

    setRankings(rankings) {
        //console.log("Before setstate, algebra= "+ this.state.algebra);
        //this.setState({...rankings});
        //console.log("After setstate, algebra= "+ this.state.algebra);
        //console.log(this.state.algebra > 5);
        
        // Truncates algebra scores into a 0-5 range
        if (this.state.algebra > 5) {
            this.state.algebra = 5;
            console.log(this.state.algebra);
        }
        else if (this.state.algebra < 0) {
            this.state.algebra = 0;
        }

        // Truncates arithmetic scores into a 0-5 range
        if (this.state.arithmetic > 5) {
            this.state.arithmetic = 5;
        }
        else if (this.state.arithmetic < 0) {
            this.state.arithmetic = 0;
        }

        // Truncates calculus scores into a 0-5 range
        if (this.state.calculus > 5) {
            this.state.calculus = 5;
        }
        else if (this.state.calculus < 0) {
            this.state.calculus = 0;
        }

        // Truncates functions scores into a 0-5 range
        if (this.state.functions > 5) {
            this.state.functions = 5;
        }
        else if (this.state.functions < 0) {
            this.state.functions = 0;
        }

        // Truncates geometry scores into a 0-5 range
        if (this.state.geometry > 5) {
            this.state.geometry = 5;
        }
        else if (this.state.geometry < 0) {
            this.state.geometry = 0;
        }

        // Truncates log scores into a 0-5 range
        if (this.state.logarithm > 5) {
            this.state.logarithm = 5;
        }
        else if (this.state.logarithm < 0) {
            this.state.logarithm = 0;
        }

        // Truncates precalc scores into a 0-5 range
        if (this.state.precalc > 5) {
            this.state.precalc = 5;
        }
        else if (this.state.precalc < 0) {
            this.state.precalc = 0;
        }

        // Truncates trig scores into a 0-5 range
        if (this.state.trigonometry > 5) {
            this.state.trigonometry = 5;
        }
        else if (this.state.trigonometry < 0) {
            this.state.trigonometry = 0;
        }

        // Truncates word problem scores into a 0-5 range
        if (this.state.word_problem > 5) {
            this.state.word_problem = 5;
        }
        else if (this.state.word_problem < 0) {
            this.state.word_problem = 0;
        }
    }

    componentDidMount() {
        fetch('http://165.227.198.233:3001/getRanking/'+Auth.getToken())
            .then(res => res.json())
            .then(rankings => this.setState({rankings}))
            .then(() => this.setState({...this.state.rankings}))
            .then(() => console.log(this.state.rankings));
    }

    render() {
        const { classes } = this.props;
        this.setRankings(this.state.rankings);
        return (
            <main className={classes.content} >
                <div className={classes.toolbar} margin-top='-100px' />
                <Typography noWrap align='center'>
                    <h1>Coming Soon!</h1>
                    {this.state.algebra}
                    <br/>
                    {this.state.arithmetic}
                    <br/>
                    {this.state.calculus}
                    <br/>
                    {this.state.functions}
                    <br/>
                    {this.state.geometry}
                    <br/>
                    {this.state.logarithm}
                    <br/>
                    {this.state.precalc}
                    <br/>
                    {this.state.trigonometry}
                    <br/>
                    {this.state.word_problem}

                </Typography>
            </main>
        );
    }
}
