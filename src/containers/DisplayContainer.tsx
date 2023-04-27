import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { getBillsThunk, updateBillThunk } from '../modules/bills';
import { TBill, TGetBillsMode } from '../models/TBill';
import { unwrapResult } from '@reduxjs/toolkit';

const DisplayContainer = () => {
	const stateBills = useAppSelector((state) => state.reducerBills);
	const dispatch = useAppDispatch();

	const bill: TBill = {
		index: -1,
		title: '1',
		when: '1',
		paidBy: '1',
		cost: 1,
		charge: { a: 1 },
		expired: true,
		createdAt: '1',
		updatedAt: '1',
	};

	const onAdd = useCallback(() => {
		try {
			dispatch(updateBillThunk(bill));
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in onAdd(bill) or onUpdate(bill)';
			console.error(err_msg, err);
			throw err;
		}
	}, []);

	const getBills = useCallback(async (mode: TGetBillsMode) => {
		try {
			const res = await dispatch(getBillsThunk(mode));
			const bills: TBill[] = unwrapResult(res);
			console.dir(bills);
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in getBills(mode)';
			console.error(err_msg, err);
			throw err;
		}
	}, []);

	return (
		<div>
			<button
				onClick={() => {
					onAdd();
				}}>
				ADD
			</button>
			<button
				onClick={() => {
					onAdd();
				}}>
				UPDATE
			</button>
			<button
				onClick={() => {
					getBills('all');
				}}>
				ALL
			</button>
			<button
				onClick={() => {
					getBills('valid');
				}}>
				VALID
			</button>
			<button
				onClick={() => {
					getBills('expired');
				}}>
				EXPIRED
			</button>
		</div>
	);
};

export default DisplayContainer;
