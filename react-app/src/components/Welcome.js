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
      <div>
        <a href="https://github.com/bati11/markdown-box">
          <img
              alt="Fork me on GitHub"
              data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
              src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
              style={{position: "absolute", top: "0", right: "0", border: "0", zIndex: "10000"}} />
        </a>
        <Grid>
          <Row className="show-grid">
            <Col md={12} xs={12}>
              <Jumbotron>
                <h1>Markdown-box</h1>
                <p>{'Markdown-box will in a little happy to your markdown in Dropbox'}</p>
                <p>
                  <LinkContainer to={'viewer'}>
                    <Button bsStyle="primary">{'Try out'}</Button>
                  </LinkContainer>
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
