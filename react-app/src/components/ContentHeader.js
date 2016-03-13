var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Breadcrumb = require('./Breadcrumb');

var style = {
  breadcrumbContainer: {
    paddingLeft: "0"
  }
};

module.exports = React.createClass({
  displayName: "ContentHeader",
  render: function() {
    return (
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={11} md={11} style={style.breadcrumbContainer}>
            <Breadcrumb
                entry={this.props.entry}
                onEntryClick={this.props.selectEntryAction} />
          </Col>
          <Col xs={1} md={1}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
});
