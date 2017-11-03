var React = require('react');
var ReactDOM = require('react-dom');
var Cubeview = require('react-cubeview');

var App = React.createClass({
	render () {
		return (
			<div>
				<Cubeview/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
