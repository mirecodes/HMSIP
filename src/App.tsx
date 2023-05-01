import ControllerContainer from './containers/ControllerContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
	<div style={{ height: '100vh', overflow: 'auto' }} className="bg-dark">
		<ControllerContainer />
	</div>
);

export default App;
