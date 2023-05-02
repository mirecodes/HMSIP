import React, { useCallback, useEffect, useMemo } from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { TBill } from '../../models/TBill';
import ItemDisplayBills from './ItemDisplayBills';
import { TUser, TUserCode } from '../../models/TUser';

type TBillsListProps = {
	users: TUser[];
	bills: TBill[];
	startEditMode: (bill: TBill) => void;
	endEditMode: () => void;
};

const BillsList = ({ users, bills, startEditMode, endEditMode }: TBillsListProps) => {
	const newBills = useMemo(() => {
		return bills.concat().sort((billA, billB) => {
			const a = billA.index,
				b = billB.index;
			return b - a;
		});
	}, [bills]);

	const findName = useCallback((code: TUserCode, users: TUser[]) => {
		if (users.length > 0) {
			const res = users.filter((user) => user.code === code);
			console.log('THIS IS:', users);
			return res[0].name;
		} else {
			console.log('WARNING: Call for a little care for findName Function');
			return code;
		}
	}, []);

	const dictUsers: Record<TUserCode, string> = useMemo(
		() => ({
			A: findName('A', users),
			B: findName('B', users),
			C: findName('C', users),
			D: findName('D', users),
		}),
		[]
	);

	const onClickEditMode = useCallback(
		(bill: TBill) => {
			startEditMode(bill);
		},
		[startEditMode]
	);

	return (
		<ListGroup as="ul" className="list-unstyled">
			{newBills.map((bill) => (
				<ItemDisplayBills
					key={bill.index}
					dictUsers={dictUsers}
					bill={bill}
					onClickEditMode={onClickEditMode}
				/>
			))}
		</ListGroup>
	);
};

export default BillsList;
