import React from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { TBill } from '../../models/TBill';
import { TUser, TUserCode } from '../../models/TUser';

type ItemDisplayBillsProps = {
	dictUsers: {
		A: string;
		B: string;
		C: string;
		D: string;
	};
	bill: TBill;
	onClickEditMode: (bill: TBill) => void;
};

const ItemDisplayBills = ({ dictUsers, bill, onClickEditMode }: ItemDisplayBillsProps) => {
	const getOwingRelationship = () => {
		let str = `${dictUsers[bill.paidBy as TUserCode]} >>> `;
		str = str.concat(bill.charge.A ? dictUsers.A + ', ' : '');
		str = str.concat(bill.charge.B ? dictUsers.B + ', ' : '');
		str = str.concat(bill.charge.C ? dictUsers.C + ', ' : '');
		str = str.concat(bill.charge.D ? dictUsers.D + ', ' : '');
		return str;
	};
	return (
		<ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
			<div className="fw-bold" style={{ width: '2.5rem' }}>
				#{bill.index}
			</div>
			<div className="ms-2 me-auto">
				<div onClick={() => onClickEditMode(bill)} style={{ cursor: 'pointer' }}>
					<span className="fw-bold">{bill.title}</span>
				</div>

				<div className="fw-normal">{getOwingRelationship()}</div>
				<div className="fw-normal">{bill.when}</div>
			</div>
			<Badge bg="primary" pill>
				₩{bill.cost}
			</Badge>
		</ListGroup.Item>
	);
};

export default ItemDisplayBills;
