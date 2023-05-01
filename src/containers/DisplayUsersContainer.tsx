import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { getUsersThunk, setUsersThunk, updateUserThunk } from '../modules/users';
import { TUser } from '../models/TUser';
import { TBill } from '../models/TBill';
import { getBillsThunk } from '../modules/bills';
import FrameUsers from '../components/DisplayUsers/FrameUsers';

const DisplayUsersContainer = () => {
	const storeUsers = useAppSelector((state) => state.reducerUsers);
	const dispatch = useAppDispatch();

	const [stateUsers, setStateUsers] = useState<TUser[]>([]);

	// Call data of all users
	useEffect(() => {
		async function primitiveCall() {
			await dispatch(getUsersThunk());
			await dispatch(getBillsThunk('all'));
		}
		primitiveCall();
		console.log('here');
	}, [dispatch]);

	// Update users when each store is updated
	useEffect(() => {
		async function loadUsers() {
			setStateUsers(storeUsers.payload);
		}
		loadUsers();
	}, [dispatch, storeUsers.payload]);

	const onUpdateUserPayment = useCallback(
		async (user: TUser) => {
			try {
				const res = await dispatch(getBillsThunk('valid'));
				const bills = unwrapResult(res);
				console.dir(bills);
				let owed = 0,
					spent = 0;
				bills.forEach((bill) => {
					console.log(bill.charge[user.code]);
					if (bill.charge[user.code]) {
						owed += Number(bill.charge[user.code]);
					}
					if (user.code === bill.paidBy) {
						spent += Number(bill.cost);
					}
				});
				const newUser: TUser = {
					...user,
					owed,
					spent,
					difference: spent - owed,
				};
				dispatch(updateUserThunk(newUser));
			} catch (err) {
				const err_msg = 'ERROR: Error has occured in onUpdateUserChange(user)';
				console.error(err_msg, err);
				throw err;
			}
		},
		[dispatch]
	);

	const onUpdateAllPayment = useCallback(async () => {
		try {
			const res = await dispatch(getUsersThunk());
			const users: TUser[] = unwrapResult(res);
			console.dir(users);
			users.forEach(async (user) => await onUpdateUserPayment(user));
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in onUpdateAllPayment()';
			console.error(err_msg, err);
			throw err;
		}
	}, [dispatch, onUpdateUserPayment]);

	return <div>{storeUsers.loading ? 'loading...' : <FrameUsers users={stateUsers} />}</div>;
};

export default DisplayUsersContainer;
