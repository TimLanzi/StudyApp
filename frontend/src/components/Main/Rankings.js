import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from '@material-ui/core/Grid';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
const jwt = require('jsonwebtoken');
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
            probsCompleted:0,
            algebra:0,
            arithmetic:0,
            calculus:0,
            functions:0,
            geometry:0,
            logarithm:0,
            precalc:0,
            trigonometry:0,
            word_problem:0,
            loaded:false,
        };
    }

    setRankings(rankings) {
        
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
            .then(() => console.log(this.state.rankings))
            .then(() => this.setState({loaded: true}));
    }

    render() {
        const { classes } = this.props;
        if (this.state.loaded && this.state.probsCompleted >= 15)
        {
            this.setRankings(this.state.rankings);
            let basic = (this.state.arithmetic + this.state.algebra + this.state.functions + this.state.word_problem) / 4,
                intermediate = (this.state.functions + this.state.word_problem + this.state.logarithm + this.state.geometry) / 4,
                advanced = (this.state.trigonometry + this.state.geometry + this.state.precalc + this.state.calculus) / 4,
                overall = (basic + intermediate + advanced) / 3;
            let decoded = jwt.decode(Auth.getToken());
            return (
                <main className={classes.content} >
                    <div className={classes.toolbar} margin-top='-100px' />
                    <Typography align='center'>
                        <h1>{decoded.username}'s Rankings</h1>
                        <br/>
                        <Grid container wrap="nowrap" spacing={40}>
                            <Grid item xs={6}>
                                <div align="left">
                                <h2>{"Overall Ranking: " + overall.toFixed(2)}</h2>
                                <h1>
                                <StarRatingComponent
                                    name="overall"
                                    editing={false}
                                    starCount={5}
                                    value={Math.round(overall)}
                                    starColor={"#2196f3"}
                                /></h1>
                                <h2>{"Basic Problems: " + basic.toFixed(2)}</h2>
                                <h1>
                                <StarRatingComponent
                                    name="basic"
                                    editing={false}
                                    starCount={5}
                                    value={Math.round(basic)}
                                    starColor={"#2196f3"}
                                /></h1>
                                <h2>{"Intermediate Problems: " + intermediate.toFixed(2)}</h2>
                                <h1>
                                <StarRatingComponent
                                    name="intermediate"
                                    editing={false}
                                    starCount={5}
                                    value={Math.round(intermediate)}
                                    starColor={"#2196f3"}
                                /></h1>
                                <h2>{"Advanced Problems: " + advanced.toFixed(2)}</h2>
                                <h1>
                                <StarRatingComponent
                                    name="advanced"
                                    editing={false}
                                    starCount={5}
                                    value={Math.round(advanced)}
                                    starColor={"#2196f3"}
                                /></h1>
                                </div>
                            </Grid>
                            <Grid item xs={28}>
                                <div align="left">
                                <img src={require('../../img/success.jpg')} style={{width:600, height:840}}/>
                                {/*
                                <strong>
                                <p>We're no strangers to love<br/>You know the rules and so do I<br/>A full commitment's what I'm thinking of<br/>You wouldn't get this from any other guy</p>
                                <p>I just wanna tell you how I'm feeling<br/>Gotta make you understand</p>
                                <p>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you</p>
                                <p>We've known each other for so long<br/>Your heart's been aching but you're too shy to say it<br/>Inside we both know what's been going on<br/>We know the game and we're gonna play it</p>
                                <p>And if you ask me how I'm feeling<br/>Don't tell me you're too blind to see</p>
                                <p>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you<br/>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you</p>
                                <p>(Ooh give you up)<br/>(Ooh give you up)<br/>(Ooh) Never gonna give, never gonna give (give you up)<br/>(Ooh) Never gonna give, never gonna give (give you up)</p>
                                <p>We've known each other for so long<br/>Your heart's been aching but you're too shy to say it<br/>Inside we both know what's been going on<br/>We know the game and we're gonna play it</p>
                                <p>I just wanna tell you how I'm feeling<br/>Gotta make you understand</p>
                                <p>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you<br/>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you<br/>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you</p>
                                </strong>
                                */}
                                </div>
                            </Grid>
                        </Grid>
                    </Typography>
                </main>
            );
        }
        else if (this.state.loaded && this.state.probsCompleted < 15)
        {
            let decoded = jwt.decode(Auth.getToken());

            return (
            <main className={classes.content} >
                <div className={classes.toolbar} margin-top='-100px' />
                <Typography align='center'>
                    <h1>{decoded.username}'s Rankings</h1>
                    <br/>
                    <Grid container wrap="nowrap" spacing={40}>
                        <Grid item xs={12} sm={6}>
                        <div align="left">
                            <h4>You haven't done enough problems for us to accurately calculate your rankings yet. Keep working on our practice page <Link to="/practiceQ">here</Link>!</h4>

                        </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <div align="left">
                        <img src={require('../../img/success.jpg')} style={{width:600, height:840}}/>
                        {/*
                        <strong>
                        <p>We're no strangers to love<br/>You know the rules and so do I<br/>A full commitment's what I'm thinking of<br/>You wouldn't get this from any other guy</p>
                        <p>I just wanna tell you how I'm feeling<br/>Gotta make you understand</p>
                        <p>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you</p>
                        <p>We've known each other for so long<br/>Your heart's been aching but you're too shy to say it<br/>Inside we both know what's been going on<br/>We know the game and we're gonna play it</p>
                        <p>And if you ask me how I'm feeling<br/>Don't tell me you're too blind to see</p>
                        <p>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you<br/>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you</p>
                        <p>(Ooh give you up)<br/>(Ooh give you up)<br/>(Ooh) Never gonna give, never gonna give (give you up)<br/>(Ooh) Never gonna give, never gonna give (give you up)</p>
                        <p>We've known each other for so long<br/>Your heart's been aching but you're too shy to say it<br/>Inside we both know what's been going on<br/>We know the game and we're gonna play it</p>
                        <p>I just wanna tell you how I'm feeling<br/>Gotta make you understand</p>
                        <p>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you<br/>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you<br/>Never gonna give you up<br/>Never gonna let you down<br/>Never gonna run around and desert you<br/>Never gonna make you cry<br/>Never gonna say goodbye<br/>Never gonna tell a lie and hurt you</p>
                        </strong>
                        */}
                        </div>
                        </Grid>
                    </Grid>
                </Typography>
            </main>
        );

        }
        else //if (!this.state.loaded)
        {
        return (
            <main className={classes.content} >
                <div className={classes.toolbar} margin-top='-100px' />
                <Typography align='center'>
                <h1>Loading your rankings...</h1>
                </Typography>
            </main>
        );
        }    
    }
}
