import React from 'react';
import { TBill } from '../../models/TBill';

// %%% Models %%%
type TTableItemBillsProps = {
	bill: TBill;
};

const TableItemBills = ({ bill }: TTableItemBillsProps) => {
	const billComponents = [
		bill.index,
		bill.title,
		bill.when,
		bill.paidBy,
		bill.cost,
		bill.charge.A,
		bill.charge.B,
		bill.charge.C,
		bill.charge.D,
		bill.expired,
		bill.createdAt,
		bill.updatedAt,
	];

	return (
		<tr key={'ITEM_BILL:' + billComponents.toString()}>
			{billComponents.map((component, index) => (
				<td>{component}</td>
			))}
		</tr>
	);
};

export default TableItemBills;
