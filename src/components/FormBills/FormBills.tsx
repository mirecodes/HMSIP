import React, { ChangeEvent, useCallback, useState } from 'react';
import Checkbox from './Checkbox';
import { TBill } from '../../models/TBill';

// %%% Models %%%
type TStateFormBills = {
	index: number;
	title: string;
	when: string;
	paidBy: string;
	cost: number;
	charge: {
		a: boolean | number;
		b: boolean | number;
		c: boolean | number;
		d: boolean | number;
	};
	expired: false;
};

// %%% Type Checking %%%
const isTKeyBills = (property: string): property is keyof TStateFormBills => {
	return true;
};

const FormBills = () => {
	const [inputBill, setInputBill] = useState<TStateFormBills>({} as TStateFormBills);

	const onChangeText = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const name = e.target.name;
			if (isTKeyBills(name)) {
				const value = e.target.value;
				const newBill = {
					...inputBill,
					...inputBill.charge,
					[name]: value,
				};
				setInputBill(newBill);
			} else {
				throw Error('ERROR: Type Incompatiable in onChangeText(e)');
			}
		},
		[inputBill]
	);

	const onChangeCheckbox = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const name = e.target.name;
		},
		[inputBill]
	);

	const onSelect = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const name = e.target.name;
			if (name === 'paidBy') {
				const value = e.target.value;
				const newBill = {
					...inputBill,
					...inputBill.charge,
					[name]: value,
				};
				setInputBill(newBill);
			} else {
				throw Error('ERROR: Type Incompatiable in onSelect(e)');
			}
		},
		[inputBill]
	);

	return (
		<div>
			<form>
				<input name="index" type="text" value={inputBill.index} onChange={onChangeText}></input>
				<input name="title" type="text" value={inputBill.title} onChange={onChangeText}></input>
				<input name="when" type="text" value={inputBill.when} onChange={onChangeText}></input>
				<select name="paidBy" onChange={onSelect} value={inputBill.paidBy}>
					<option value="A">AA</option>
					<option value="B">BB</option>
					<option value="C">CC</option>
					<option value="D">DD</option>
				</select>
				<input name="cost" type="number" value={inputBill.cost} onChange={onChangeText}></input>
				<div>
					<label>
						<input
							type="checkbox"
							checked={Boolean(inputBill.charge.a)}
							onChange={onChangeCheckbox}></input>
					</label>
					<Checkbox disabled={false} checked={false}>
						chargeA
					</Checkbox>
					<Checkbox disabled={false} checked={false}>
						chargeB
					</Checkbox>
					<Checkbox disabled={false} checked={false}>
						chargeC
					</Checkbox>
					<Checkbox disabled={false} checked={false}>
						chargeD
					</Checkbox>
				</div>
				<Checkbox disabled={false} checked={false}>
					expired
				</Checkbox>
				<input name="submit" type="submit"></input>
			</form>
		</div>
	);
};

export default FormBills;
