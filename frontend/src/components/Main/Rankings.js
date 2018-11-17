import React from 'react';
import Typography from 'material-ui/Typography';
import StarRatingComponent from 'react-star-rating-component';
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
        let basic = (this.state.arithmetic + this.state.algebra + this.state.functions + this.state.word_problem) / 4,
            intermediate = (this.state.functions + this.state.word_problem + this.state.logarithm + this.state.geometry) / 4,
            advanced = (this.state.trigonometry + this.state.geometry + this.state.precalc + this.state.calculus) / 4,
            overall = (basic + intermediate + advanced) / 3;
        return (
            <main className={classes.content} >
                <div className={classes.toolbar} margin-top='-100px' />
                <Typography noWrap align='center'>
                    <h2>Pardon our progress</h2>
                    <div align="left">
                    {"Overall Ranking: " + overall.toFixed(2)}
                    <br/><h1><b>
                    <StarRatingComponent
                        name="overall"
                        editing={false}
                        starCount={5}
                        value={Math.round(overall)}
                        starColor={"#2196f3"}
                    /></b></h1>
                    {"Basic Problems: " + basic.toFixed(2)}
                    <br/><h1>
                    <StarRatingComponent
                        name="basic"
                        editing={false}
                        starCount={5}
                        value={Math.round(basic)}
                        starColor={"#2196f3"}
                    /></h1>
                    {"Intemediate Problems: " + intermediate.toFixed(2)}
                    <br/><h1>
                    <StarRatingComponent
                        name="intermediate"
                        editing={false}
                        starCount={5}
                        value={Math.round(intermediate)}
                        starColor={"#2196f3"}
                    /></h1>
                    {"Advanced Problems: " + advanced.toFixed(2)}
                    <br/><h1>
                    <StarRatingComponent
                        name="advanced"
                        editing={false}
                        starCount={5}
                        value={Math.round(advanced)}
                        starColor={"#2196f3"}
                    /></h1>
                    </div>
                </Typography>
            </main>
        );
    }
}
