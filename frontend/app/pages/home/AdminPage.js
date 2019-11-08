import React from 'react';
import Container from 'reactstrap/es/Container';
import CardBody from 'reactstrap/es/CardBody';
import Card from 'reactstrap/es/Card';
import Row from 'reactstrap/es/Row';
import TagMap from "../../components/TagMap";
import Col from "reactstrap/es/Col";
import Alert from "reactstrap/es/Alert";
import Jumbotron from "reactstrap/es/Jumbotron";
import ApiRequest from "../../helpers/ApiRequest";
import ScoreBoard from "../../components/ScoreBoard";
import * as Swal from "sweetalert2";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";

export default class HomePaAdminPagege extends React.Component {

    state = {
        locations: [],
        teams: [],
        error: null,
        updateTimer: -1,
        password: null,
        teamName: null
    };

    componentDidMount() {
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

    handleFieldChange(event) {

        let update = {};

        update[event.target.id] = event.target.value;

        this.setState(update);
    }

    componentWillUnmount() {
        clearImmediate(this.state.updateTimer);
    }

    doCreate() {
        new ApiRequest("/api/v1/team/create/" + this.state.password + "/" + this.state.teamName)
            .run()
            .then((token) => {
                Swal.fire({
                    animation: false,
                    titleText: window.location.href + "#" + token,
                })
            })
            .catch(() => {
                Swal.fire({
                    animation: false,
                    titleText: 'Error',
                    text: 'Password incorrect'
                })
            })
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Container>
                    <br/>
                    <Row>
                        <Col md={'12'}>
                            <Alert color={'danger'}>
                                Je kijkt nu mee als gast
                            </Alert>
                        </Col>
                    </Row>
                </Container>

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
                                <Col md={'12'}>
                                    <Jumbotron>
                                        <Row>
                                            <Col md={'12'}>
                                                <ScoreBoard teams={this.state.teams}/>
                                            </Col>
                                        </Row>
                                    </Jumbotron>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={'12'}>
                                    <Card>
                                        <CardBody>
                                            <TagMap isAdmin={true} locations={this.state.locations}
                                                    teams={this.state.teams}/>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </div>
                <Container>
                    <br/>
                    <Row>
                        <Col md={'12'}>
                            <Card>
                                <CardBody>
                                    <FormGroup>
                                        <Label for="teamName">Team name</Label>
                                        <Input onChange={(element) => {
                                            this.handleFieldChange(element);
                                        }} type="text" name="teamname" id="teamName" placeholder="Welivesum" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input onChange={(element) => {
                                            this.handleFieldChange(element);
                                        }} type="password" name="password" id="password" placeholder="Admin password" />
                                    </FormGroup>
                                    <Button onClick={() => {
                                        this.doCreate();
                                    }}>Create team</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
