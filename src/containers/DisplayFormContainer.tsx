import React, { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { addBillThunk, getBillsThunk, updateBillThunk } from '../modules/bills';
import { TBill, TGetBillsMode } from '../models/TBill';
import { unwrapResult } from '@reduxjs/toolkit';
import FormFrame from '../components/FormBills/FormFrame';

const DisplayFormContainer = () => {
	const stateBills = useAppSelector((state) => state.reducerBills);
	const dispatch = useAppDispatch();

	const onAddBill = useCallback(
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
			<FormFrame onAddBill={onAddBill} />
		</div>
	);
};

export default DisplayFormContainer;
