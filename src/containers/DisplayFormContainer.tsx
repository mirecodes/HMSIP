import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { addBillThunk, getBillsThunk, updateBillThunk } from '../modules/bills';
import { TBill, TGetBillsMode } from '../models/TBill';
import { unwrapResult } from '@reduxjs/toolkit';
import FormFrame from '../components/DisplayForm/FormFrame';
import { TUser } from '../models/TUser';
import { getUsersThunk, updateUserThunk } from '../modules/users';
import Container from 'react-bootstrap/esm/Container';
import { TStateCharge, TStateInput } from '../components/DisplayForm/FormContents';

const initialStateInput: TStateInput = {
	index: 0,
	title: '',
	when: '',
	paidBy: '',
	cost: 0,
	expired: false,
};

const initialStateCharge: TStateCharge = {
	chargeA: false,
	chargeB: false,
	chargeC: false,
	chargeD: false,
	amountA: 0,
	amountB: 0,
	amountC: 0,
	amountD: 0,
};

const DisplayFormContainer = () => {
	const storeUsers = useAppSelector((state) => state.reducerUsers);
	const dispatch = useAppDispatch();

	const [stateUsers, setStateUsers] = useState<TUser[]>([]);

	// Call data of all users
	useEffect(() => {
		async function primitiveCall() {
			await dispatch(getUsersThunk());
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

	const addBill = useCallback(
		async (bill: TBill) => {
			try {
				await dispatch(addBillThunk(bill));
				await onUpdateAllPayment();
			} catch (err) {
				const err_msg = 'ERROR: Error has occured in onSubmit(bill)';
				console.error(err_msg, err);
				throw err;
			}
		},
		[dispatch, onUpdateAllPayment]
	);

	return (
		<div>
			<FormFrame
				users={stateUsers}
				addBill={addBill}
				initialStateInput={initialStateInput}
				initialStateCharge={initialStateCharge}
				isNewBill={true}
				cardTitle={'Register Your Bill'}
			/>
		</div>
	);
};

export default DisplayFormContainer;
