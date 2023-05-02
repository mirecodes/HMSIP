import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { getBillsThunk, updateBillThunk } from '../modules/bills';
import BillsFrame from '../components/DisplayBills/BillsFrame';
import { TBill } from '../models/TBill';
import { TUser } from '../models/TUser';
import { getUsersThunk, updateUserThunk } from '../modules/users';
import { updateBill } from '../apis/firestore-bills';
import { unwrapResult } from '@reduxjs/toolkit';

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

	const onUpdateUserPayment = useCallback(
		async (user: TUser) => {
			try {
				const res = await dispatch(getBillsThunk('valid'));
				const bills = unwrapResult(res);
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
				await dispatch(updateUserThunk(newUser));
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
			const users = stateUsers;
			users.forEach(async (user) => await onUpdateUserPayment(user));
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in onUpdateAllPayment()';
			console.error(err_msg, err);
			throw err;
		}
	}, [onUpdateUserPayment, stateUsers]);

	const onUpdateBill = useCallback(
		async (bill: TBill) => {
			try {
				await dispatch(updateBillThunk(bill));
				await onUpdateAllPayment();
			} catch (err) {
				const err_msg = 'ERROR: Error has occured in onUpdateBill(bill)';
				console.error(err_msg, err);
				throw err;
			}
		},
		[dispatch, onUpdateAllPayment]
	);

	return (
		<div>
			{storeBills.loading || storeUsers.loading ? (
				'loading'
			) : (
				<BillsFrame users={stateUsers} bills={stateBills} onUpdateBill={onUpdateBill} />
			)}
		</div>
	);
};

export default DisplayBillsContainer;
