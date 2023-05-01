import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { addBillThunk, getBillsThunk, updateBillThunk } from '../modules/bills';
import { TBill, TGetBillsMode } from '../models/TBill';
import { unwrapResult } from '@reduxjs/toolkit';
import FormFrame from '../components/DisplayForm/FormFrame';
import { TUser } from '../models/TUser';
import { getUsersThunk } from '../modules/users';

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

	const addBill = useCallback(
		async (bill: TBill) => {
			try {
				await dispatch(addBillThunk(bill));
			} catch (err) {
				const err_msg = 'ERROR: Error has occured in onSubmit(bill)';
				console.error(err_msg, err);
				throw err;
			}
		},
		[dispatch]
	);

	return (
		<div>
			<FormFrame users={stateUsers} addBill={addBill} />
		</div>
	);
};

export default DisplayFormContainer;
