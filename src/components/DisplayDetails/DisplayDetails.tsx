import React from 'react';
import { TBill } from '../../models/TBill';
import TableBills from './TableBills';

// %%% Models %%%
type TDisplayBillsProps = {
	bills: TBill[];
};

const DisplayDetails = ({ bills }: TDisplayBillsProps) => {
	return (
		<div>
			<TableBills bills={bills} />
		</div>
	);
};

export default DisplayDetails;
