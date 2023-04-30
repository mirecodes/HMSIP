import React from 'react';
import BillsList from './BililsList';
import { TBill } from '../../models/TBill';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import { TUser } from '../../models/TUser';

type TBillsFrameProps = {
	users: TUser[];
	bills: TBill[];
};

const BillsFrame = ({ users, bills }: TBillsFrameProps) => {
	return (
		<Container>
			<div className="my-3">
				<BillsList users={users} bills={bills} />
			</div>
		</Container>
	);
};

export default BillsFrame;
