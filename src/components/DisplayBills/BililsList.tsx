import React, { useCallback, useEffect, useMemo } from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { TBill } from '../../models/TBill';
import ItemDisplayBills from './ItemDisplayBills';
import { TUser, TUserCode } from '../../models/TUser';

type TBillsListProps = {
	users: TUser[];
	bills: TBill[];
};

const BillsList = ({ users, bills }: TBillsListProps) => {
	useEffect(() => {
		bills.concat().sort((billA, billB) => {
			const a = billA.index,
				b = billB.index;
			if (a < b) return -1;
			else if (a === b) return 0;
			else if (a > b) return 1;
			else return 0;
		});
	}, [bills]);

	const findName = useCallback((code: TUserCode, users: TUser[]) => {
		console.dir(users);
		if (users.length > 0) {
			const res = users.filter((user) => user.code === code);
			console.dir(res);
			return res[0].name;
		} else {
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
		[findName, users]
	);

	return (
		<ListGroup as="ul" className="list-unstyled">
			{bills.map((bill) => (
				<ItemDisplayBills dictUsers={dictUsers} bill={bill} />
			))}
		</ListGroup>
	);
};

export default BillsList;
