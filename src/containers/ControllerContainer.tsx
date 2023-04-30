import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayNavigation from './DisplayNavigation';
import DisplayUsersContainer from './DisplayUsersContainer';
import DisplayFormContainer from './DisplayFormContainer';
import DisplayBillsContainer from './DisplayBillsContainer';
import DisplayDetailsContainer from './DisplayDetailsContainer';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { TBill } from '../models/TBill';
import { TUser } from '../models/TUser';

const ControllerContainer = () => {
	// %%% Mother Code %%%
	// const storeBills = useAppSelector((state) => state.reducerBills);
	// const storeUsers = useAppSelector((state) => state.reducerUsers);
	// const dispatch = useAppDispatch();

	// const [stateBills, setStateBills] = useState<TBill[]>();
	// const [stateUsers, setStateUsers] = useState<TUser[]>();

	// useEffect(() => {
	// 	async function loading() {
	// 		setStateBills(storeBills.payload);
	// 		setStateUsers(storeUsers.payload);
	// 	}
	// 	loading();
	// }, [dispatch, storeBills.payload, storeUsers.payload]);

	return (
		<BrowserRouter>
			<DisplayNavigation />
			<Routes>
				<Route path="/HMSIP" element={<DisplayUsersContainer />} />
				<Route path="/HMSIP/form" element={<DisplayFormContainer />} />
				<Route path="/HMSIP/bills" element={<DisplayBillsContainer />} />
				<Route path="/HMSIP/details" element={<DisplayDetailsContainer />} />
			</Routes>
		</BrowserRouter>
	);
};

export default ControllerContainer;
