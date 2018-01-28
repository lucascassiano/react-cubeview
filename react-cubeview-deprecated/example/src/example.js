var React = require('react');
var ReactDOM = require('react-dom');
var Cubeview = require('../dist/react-cubeview.js');

var App = React.createClass({
	render() {
		return (
			<div>
				<CubeView aspect={1} hoverColor={0x0088FF} cubeSize={2} zoom={6} antialias={false} />

			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
