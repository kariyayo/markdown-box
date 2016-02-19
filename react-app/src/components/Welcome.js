var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;
var LinkContainer = require('react-router-bootstrap').LinkContainer;

module.exports = React.createClass({
  displayName: "Welcome",
  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Jumbotron>
              <h1>Markdown-box</h1>
              <p>{'Markdown-box will in a little happy to your markdown in Dropbox'}</p>
              <p>
                <LinkContainer to={'/viewer'}>
                  <Button bsStyle="primary">{'Try out'}</Button>
                </LinkContainer>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
});
