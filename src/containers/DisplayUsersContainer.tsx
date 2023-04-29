import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { getUsersThunk, setUsersThunk, updateUserThunk } from '../modules/users';
import { TUser } from '../models/TUser';
import { TBill } from '../models/TBill';
import { getBillsThunk } from '../modules/bills';

const DisplayUsersContainer = () => {
	const stateBills = useAppSelector((state) => state.reducerBills);
	const stateUsers = useAppSelector((state) => state.reducerUsers);
	const dispatch = useAppDispatch();

	const onGetUsers = useCallback(async () => {
		try {
			const res = await dispatch(getUsersThunk());
			const users: TUser[] = unwrapResult(res);
			console.dir(users);
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in onGetUsers()';
			console.error(err_msg, err);
			throw err;
		}
	}, [dispatch]);

	const onUpdateUser = useCallback(
		async (user: TUser) => {
			try {
				await dispatch(updateUserThunk(user));
			} catch (err) {
				const err_msg = 'ERROR: Error has occured in getUsers()';
				console.error(err_msg, err);
				throw err;
			}
		},
		[dispatch]
	);

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
		[dispatch, stateBills.payload]
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

	return (
		<div>
			<button onClick={onUpdateAllPayment}>updateAllCharge</button>
			<button onClick={onGetUsers}>getUsers</button>
		</div>
	);
};

export default DisplayUsersContainer;
