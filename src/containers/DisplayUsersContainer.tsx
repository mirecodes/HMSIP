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

	return <div>{storeUsers.loading ? 'loading...' : <FrameUsers users={stateUsers} />}</div>;
};

export default DisplayUsersContainer;
