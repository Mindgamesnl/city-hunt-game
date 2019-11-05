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

export default class HomePage extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={'12'}>
                        <Jumbotron>
                            <Row>
                                <Col md={'4'}>
                                    <Alert color={'info'}>
                                        Welkom team (team)! Jouw kleur is (color).
                                    </Alert>
                                </Col>
                                <Col md={'8'}>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Team naam</th>
                                            <th>Score</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Welivesum</td>
                                            <td>1206</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Welivehere</td>
                                            <td>874</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Weesp</td>
                                            <td>0</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col md={'12'}>
                        <Card>
                            <CardBody>
                                <TagMap/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
