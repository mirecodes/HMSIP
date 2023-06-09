import React, { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { addBillThunk, getBillsThunk, updateBillThunk } from '../modules/bills';
import { TBill, TGetBillsMode } from '../models/TBill';
import { unwrapResult } from '@reduxjs/toolkit';
import DisplayBills from '../components/DisplayDetails';

const DisplayDetailsContainer = () => {
	const stateBills = useAppSelector((state) => state.reducerBills);
	const dispatch = useAppDispatch();

	const bill: TBill = useMemo(
		() => ({
			index: -1,
			title: '1',
			when: '1',
			paidBy: '1',
			cost: 1,
			charge: { A: 1, B: 1, C: 1, D: 1 },
			expired: true,
			createdAt: '1',
			updatedAt: '1',
		}),
		[]
	);

	const onAdd = useCallback(() => {
		try {
			dispatch(addBillThunk(bill));
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in onAdd(bill)';
			console.error(err_msg, err);
			throw err;
		}
	}, [bill, dispatch]);

	const onUpdate = useCallback(() => {
		try {
			dispatch(updateBillThunk(bill));
		} catch (err) {
			const err_msg = 'ERROR: Error has occured in onUpdate(bill)';
			console.error(err_msg, err);
			throw err;
		}
	}, [bill, dispatch]);

	const getBills = useCallback(
		async (mode: TGetBillsMode) => {
			try {
				const res = await dispatch(getBillsThunk(mode));
				const bills: TBill[] = unwrapResult(res);
				console.dir(bills);
			} catch (err) {
				const err_msg = 'ERROR: Error has occured in getBills(mode)';
				console.error(err_msg, err);
				throw err;
			}
		},
		[dispatch]
	);

	const onSubmit = useCallback(
		async (bill: TBill) => {
			try {
				const res = await dispatch(addBillThunk(bill));
				const uploaded: TBill[] = unwrapResult(res);
				console.dir(uploaded);
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
			<DisplayBills bills={stateBills.payload} />
			<button
				onClick={() => {
					onAdd();
				}}>
				ADD
			</button>
			<button
				onClick={() => {
					onUpdate();
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

export default DisplayDetailsContainer;
