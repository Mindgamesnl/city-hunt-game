import React from 'react';
import Container from 'reactstrap/es/Container';
import Button from 'reactstrap/es/Button';
import CardBody from 'reactstrap/es/CardBody';
import CardTitle from 'reactstrap/es/CardTitle';
import CardSubtitle from 'reactstrap/es/CardSubtitle';
import Card from 'reactstrap/es/Card';
import Row from 'reactstrap/es/Row';
import TagMap from "../../components/TagMap";
import Col from "reactstrap/es/Col";

export default class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={'12'}>
              <Card>
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <TagMap />
                  </CardBody>
              </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
