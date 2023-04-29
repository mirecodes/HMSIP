import React from 'react';
import DisplayBillsContainer from './containers/DisplayBillsContainer';
import DisplayUsersContainer from './containers/DisplayUsersContainer';
import DisplayFormContainer from './containers/DisplayFormContainer';

const App = () => {
	return (
		<div>
			<DisplayFormContainer />
			<hr />
			<DisplayBillsContainer />
			<hr />
			<DisplayUsersContainer />
		</div>
	);
};

export default App;
