var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var FileTree = require('./FileTree');
var Content = require('./Content');

module.exports = React.createClass({
  displayName: "ViewPage",
  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col
              md={2}
              xs={12}
          >
            <FileTree />
          </Col>
          <Col
              md={10}
              xs={12}
          >
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
});

