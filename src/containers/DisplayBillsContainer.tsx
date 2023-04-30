import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { getBillsThunk } from '../modules/bills';
import BillsFrame from '../components/DisplayBills/BillsFrame';
import { TBill } from '../models/TBill';
import { TUser } from '../models/TUser';
import { getUsersThunk } from '../modules/users';

const DisplayBillsContainer = () => {
	const storeUsers = useAppSelector((state) => state.reducerUsers);
	const storeBills = useAppSelector((state) => state.reducerBills);
	const dispatch = useAppDispatch();

	const [stateBills, setStateBills] = useState<TBill[]>([]);
	const [stateUsers, setStateUsers] = useState<TUser[]>([]);

	// Call data of all users, bills
	useEffect(() => {
		async function primitiveCall() {
			await dispatch(getUsersThunk());
			await dispatch(getBillsThunk('all'));
		}
		primitiveCall();
		console.log('here');
	}, [dispatch]);

	// Update users, bills when each store is updated
	useEffect(() => {
		async function loadBills() {
			setStateBills(storeBills.payload);
		}
		loadBills();
	}, [dispatch, storeBills.payload]);

	useEffect(() => {
		async function loadUsers() {
			setStateUsers(storeUsers.payload);
		}
		loadUsers();
	}, [dispatch, storeUsers.payload]);

	return (
		<div>
			{storeBills.loading || storeUsers.loading ? (
				'loading'
			) : (
				<BillsFrame users={stateUsers} bills={stateBills} />
			)}
		</div>
	);
};

export default DisplayBillsContainer;
