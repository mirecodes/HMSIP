import React, { useMemo } from 'react';
import TableItemBills from './TableItemBills';
import { TBill } from '../../models/TBill';

// %%% Models %%%
type TTableBillsProps = {
	bills: TBill[];
};

// %%% Constants %%%
export const COLUMN_NAMES = [
	'index',
	'title',
	'when',
	'paidBy',
	'cost',
	'chargeA',
	'chargeB',
	'chargeC',
	'chargeD',
	'expired',
	'createdAt',
	'updatedAt',
];

const TableBills = ({ bills }: TTableBillsProps) => {
	return (
		<div>
			<table>
				<thead>
					<tr key={'COLUMN_NAME:' + COLUMN_NAMES.toString()}>
						{COLUMN_NAMES.map((name, index) => (
							<th>{name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{bills.map((bill) => (
						<TableItemBills bill={bill} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableBills;
