import React from 'react';
import DisplayBillsContainer from './containers/DisplayBillsContainer';
import DisplayUsersContainer from './containers/DisplayUsersContainer';
import DisplayFormContainer from './containers/DisplayFormContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<BrowserRouter>
		<div>
			<Routes>
				<Route path="/" element={<DisplayUsersContainer />} />
				<Route path="/form" element={<DisplayFormContainer />} />
				<Route path="/bills" element={<DisplayBillsContainer />} />
			</Routes>
		</div>
	</BrowserRouter>
);

export default App;
