import React from 'react';
import Container from 'reactstrap/es/Container';
import CardBody from 'reactstrap/es/CardBody';
import Card from 'reactstrap/es/Card';
import Row from 'reactstrap/es/Row';
import TagMap from "../../components/TagMap";
import Col from "reactstrap/es/Col";
import Alert from "reactstrap/es/Alert";
import Table from "reactstrap/es/Table";
import Jumbotron from "reactstrap/es/Jumbotron";
import ApiRequest from "../../helpers/ApiRequest";
import ScoreBoard from "../../components/ScoreBoard";

export default class HomePage extends React.Component {

    state = {
        locations: [],
        teams: [],
        error: null,
        teamId: location.href.split("#")[1],
        updateTimer: -1
    };

    componentDidMount() {
        if (this.state.teamId === undefined) return;

        const timer = setInterval(() => {
            new ApiRequest("/api/v1/locations")
                .run()
                .then(result => {
                    this.setState({
                        locations: result.locations,
                        teams: result.teams
                    })
                })
                .catch((err) => {
                    console.log("whoops")
                    console.error(err)
                    this.setState({
                        error: 'Er ging iets mis tijdens het ophalen van de locaties'
                    })
                });
        }, 3000);

        this.setState({
            updateTimer: timer
        })
    }

    componentWillUnmount() {
        clearImmediate(this.state.updateTimer);
    }

    render() {

        let teamName;
        let teamColor;

        if (this.state.teams.length !== 0) {
            teamName = this.state.teams[this.state.teamId].name;
            teamColor = this.state.teams[this.state.teamId].color;
        }

        return (
            <div style={{width: '100%'}}>
                {this.state.teamId === undefined ? (
                    <Container>
                        <Row>
                            <Col md={'12'}>
                                <Jumbotron>
                                    <Alert>
                                        Alleen geldige team urls mogen gebruikt worden.
                                    </Alert>
                                </Jumbotron>
                            </Col>
                        </Row>
                    </Container>
                ) : (

                    <div>
                        {this.state.locations === null ? (
                            <Container>
                                <Row>
                                    <Col md={'12'}>
                                        <Jumbotron>
                                            <Alert>
                                                {this.state.error != null ? (
                                                    <div>
                                                        Error: {this.state.error}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Even geduld..
                                                    </div>
                                                )}
                                            </Alert>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                            </Container>
                        ) : (
                            <Container className={'justify-content-center'}>
                                <Row>
                                    <Col md={'11'}>
                                        <Jumbotron>
                                            <Row>
                                                <Col md={'4'}>
                                                    <Alert color={'info'}>
                                                        Welkom team {teamName}! Jouw kleur is <span style={{color: teamColor}} className="sim">███</span>.
                                                    </Alert>
                                                </Col>
                                                <Col md={'8'}>
                                                    <ScoreBoard teams={this.state.teams}/>
                                                </Col>
                                            </Row>
                                        </Jumbotron>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={'11'}>
                                        <Card>
                                            <CardBody>
                                                <TagMap locations={this.state.locations} teams={this.state.teams}/>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
