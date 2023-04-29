import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { TBill } from '../../models/TBill';

// %%% Models %%%
type TStateInput = {
	index: number;
	title: string;
	when: string;
	paidBy: string;
	cost: number;
	expired: false;
};

const initialStateInput: TStateInput = {
	index: -1,
	title: '',
	when: '',
	paidBy: 'A',
	cost: 0,
	expired: false,
};

type TStateCharge = {
	chargeA: boolean;
	chargeB: boolean;
	chargeC: boolean;
	chargeD: boolean;
	amountA: number;
	amountB: number;
	amountC: number;
	amountD: number;
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

type TFormBillsProps = {
	onAddBill: (bill: TBill) => void;
};

// %%% Type Checking %%%
const isKeyofStateInput = (property: string): property is keyof TStateInput => {
	return true;
};

const isKeyofStateCharge = (property: string): property is keyof TStateCharge => {
	return true;
};

const FormBills = ({ onAddBill }: TFormBillsProps) => {
	const [stateInput, setStateInput] = useState<TStateInput>(initialStateInput);
	const [stateCharge, setStateCharge] = useState<TStateCharge>(initialStateCharge);

	const onChangeText = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const name = e.target.name;
			if (isKeyofStateInput(name)) {
				const value = e.target.value;
				const newBill = {
					...stateInput,
					[name]: value,
				};
				setStateInput(newBill);
			} else {
				throw Error('ERROR: Type Incompatiable in onChangeText(e)');
			}
		},
		[stateInput]
	);

	const onChangeCharge = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const name = e.target.name;
			if (isKeyofStateCharge(name)) {
				const newStateCharge = {
					...stateCharge,
					[name]: e.target.checked,
				};
				setStateCharge(newStateCharge);
			} else {
				throw Error('ERROR: Type Incompatiable in onChangeCharge(e)');
			}
		},
		[stateCharge]
	);

	const onChangeAmount = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const name = e.target.name;
			if (isKeyofStateCharge(name)) {
				const newStateCharge = {
					...stateCharge,
					[name]: e.target.value,
				};
				setStateCharge(newStateCharge);
			} else {
				throw Error('ERROR: Type Incompatiable in onChangeAmount(e)');
			}
		},
		[stateCharge]
	);

	const onSelect = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const name = e.target.name;
			if (name === 'paidBy') {
				const value = e.target.value;
				const newBill = {
					...stateInput,
					[name]: value,
				};
				console.dir(newBill);
				setStateInput(newBill);
			} else {
				throw Error('ERROR: Type Incompatiable in onSelect(e)');
			}
		},
		[stateInput]
	);

	const onChangeExpiry = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const name = e.target.name;
			if (isKeyofStateCharge(name)) {
				const newStateCharge = {
					...stateCharge,
					[name]: e.target.value,
				};
				setStateCharge(newStateCharge);
			} else {
				throw Error('ERROR: Type Incompatiable in onChangeAmount(e)');
			}
		},
		[stateCharge]
	);

	const onSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const { title, when, paidBy, cost, expired } = stateInput;
			const { amountA, amountB, amountC, amountD } = stateCharge;
			const cond1 = Boolean(title) && Boolean(paidBy) && Boolean(when) && Boolean(cost);
			const cond2 = Number(cost) === Number(amountA) + Number(amountB) + Number(amountC) + Number(amountD);
			console.log(cond1, Boolean(title), Boolean(paidBy), Boolean(when), Boolean(cost));
			console.log(cond2, cost, Number(amountA) + Number(amountB) + Number(amountC) + Number(amountD));
			const date = new Date();
			const dateString = date.toString();
			if (cond1 && cond2) {
				const bill: TBill = {
					index: -1,
					title,
					when,
					paidBy,
					cost: cost as number,
					charge: {
						A: amountA as number,
						B: amountB as number,
						C: amountC as number,
						D: amountD as number,
					},
					expired: expired,
					createdAt: dateString,
					updatedAt: dateString,
				};
				await onAddBill(bill);
			}
		},
		[onAddBill, stateCharge, stateInput]
	);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="index"
					type="text"
					value={stateInput.index}
					onChange={onChangeText}
					placeholder="index"></input>
				<input
					name="title"
					type="text"
					value={stateInput.title}
					onChange={onChangeText}
					placeholder="title"></input>
				<input
					name="when"
					type="text"
					value={stateInput.when}
					onChange={onChangeText}
					placeholder="when"></input>
				<select name="paidBy" onChange={onSelect} value={stateInput.paidBy}>
					<option value="A">AA</option>
					<option value="B">BB</option>
					<option value="C">CC</option>
					<option value="D">DD</option>
				</select>
				<input
					name="cost"
					type="number"
					value={stateInput.cost}
					onChange={onChangeText}
					placeholder="cost"></input>
				<div>
					<label>
						<input
							name="chargeA"
							type="checkbox"
							checked={stateCharge.chargeA}
							onChange={onChangeCharge}></input>
						chargeA
						<input
							name="amountA"
							type="text"
							disabled={!stateCharge.chargeA}
							value={stateCharge.amountA}
							onChange={onChangeAmount}></input>
					</label>
					<label>
						<input
							name="chargeB"
							type="checkbox"
							checked={stateCharge.chargeB}
							onChange={onChangeCharge}></input>
						chargeB
						<input
							name="amountB"
							type="text"
							disabled={!stateCharge.chargeB}
							value={stateCharge.amountB}
							onChange={onChangeAmount}></input>
					</label>
					<label>
						<input
							name="chargeC"
							type="checkbox"
							checked={stateCharge.chargeC}
							onChange={onChangeCharge}></input>
						chargeC
						<input
							name="amountC"
							type="text"
							disabled={!stateCharge.chargeC}
							value={stateCharge.amountC}
							onChange={onChangeAmount}></input>
					</label>
					<label>
						<input
							name="chargeD"
							type="checkbox"
							checked={stateCharge.chargeD}
							onChange={onChangeCharge}></input>
						chargeD
						<input
							name="amountD"
							type="text"
							disabled={!stateCharge.chargeD}
							value={stateCharge.amountD}
							onChange={onChangeAmount}></input>
					</label>
				</div>
				<label>
					<input
						name="expired"
						type="checkbox"
						checked={stateInput.expired}
						onChange={onChangeExpiry}></input>
					expired
				</label>
				<input name="submit" type="submit"></input>
			</form>
		</div>
	);
};

export default FormBills;
