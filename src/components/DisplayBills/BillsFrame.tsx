import React, { useCallback, useState } from 'react';
import BillsList from './BililsList';
import { TBill } from '../../models/TBill';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import { TUser } from '../../models/TUser';
import { TStateCharge, TStateInput } from '../DisplayForm/FormContents';
import FormFrame from '../DisplayForm/FormFrame';

const initialStateInput: TStateInput = {
	index: 0,
	title: '',
	when: '',
	paidBy: '',
	cost: 0,
	expired: false,
};

const initialStateCharge: TStateCharge = {
	chargeA: false,
	chargeB: false,
	chargeC: false,
	chargeD: false,
	amountA: 0,
	amountB: 0,
	amountC: 0,
	amountD: 0,
};
type TBillsFrameProps = {
	users: TUser[];
	bills: TBill[];
	onUpdateBill: (bill: TBill) => void;
};
const BillsFrame = ({ users, bills, onUpdateBill }: TBillsFrameProps) => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [stateInput, setStateInput] = useState<TStateInput>(initialStateInput);
	const [stateCharge, setStateCharge] = useState<TStateCharge>(initialStateCharge);

	const startEditMode = useCallback((bill: TBill) => {
		const newInitialStateInput: TStateInput = {
			index: bill.index,
			title: bill.title,
			when: bill.when,
			paidBy: bill.paidBy,
			cost: bill.cost,
			expired: bill.expired,
		};
		const newInitialStateCharge: TStateCharge = {
			chargeA: Boolean(bill.charge.A),
			chargeB: Boolean(bill.charge.B),
			chargeC: Boolean(bill.charge.C),
			chargeD: Boolean(bill.charge.D),
			amountA: bill.charge.A,
			amountB: bill.charge.B,
			amountC: bill.charge.C,
			amountD: bill.charge.D,
		};
		setStateInput(newInitialStateInput);
		setStateCharge(newInitialStateCharge);
		setEditMode(true);
	}, []);

	const endEditMode = useCallback(() => {
		setEditMode(false);
	}, []);

	const newUpdateBill = useCallback(
		(bill: TBill) => {
			if (bill.index > -7391) {
				onUpdateBill(bill);
			}
			setEditMode(false);
		},
		[onUpdateBill]
	);

	return (
		<div>
			{editMode ? (
				<FormFrame
					users={users}
					addBill={newUpdateBill}
					initialStateInput={stateInput}
					initialStateCharge={stateCharge}
					isNewBill={false}
					cardTitle={'Update the Bill'}
				/>
			) : (
				<Container>
					<div className="my-3">
						<BillsList
							users={users}
							bills={bills}
							startEditMode={startEditMode}
							endEditMode={endEditMode}
						/>
					</div>
				</Container>
			)}
		</div>
	);
};

export default BillsFrame;
