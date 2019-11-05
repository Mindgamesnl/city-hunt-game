import React from 'react';
import Container from 'reactstrap/es/Container';
import Form from 'reactstrap/es/Form';
import Col from 'reactstrap/es/Col';
import FormGroup from 'reactstrap/es/FormGroup';
import Label from 'reactstrap/es/Label';
import Input from 'reactstrap/es/Input';
import Button from 'reactstrap/es/Button';
import CardBody from 'reactstrap/es/CardBody';
import CardTitle from 'reactstrap/es/CardTitle';
import CardSubtitle from 'reactstrap/es/CardSubtitle';
import CardText from 'reactstrap/es/CardText';
import Card from 'reactstrap/es/Card';
import Row from 'reactstrap/es/Row';

export default class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Card>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}
