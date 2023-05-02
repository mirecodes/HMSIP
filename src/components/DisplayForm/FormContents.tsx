import { ChangeEvent, FormEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { TBill } from '../../models/TBill';
import ModalComponent, { TModalControl, initialStateModal } from '../Modal/ModalComponent';
import { TUser, TUserCode } from '../../models/TUser';

// %%% Models %%%

// Undefined in bootstrap, but required type
type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

// State for 1-dimentional form data
export type TStateInput = {
	index: number;
	title: string;
	when: string;
	paidBy: string;
	cost: number;
	expired: boolean;
};

// State for chargement of users
export type TStateCharge = {
	chargeA: boolean;
	chargeB: boolean;
	chargeC: boolean;
	chargeD: boolean;
	amountA: number;
	amountB: number;
	amountC: number;
	amountD: number;
};

// %%% Type Checking %%%
const isKeyofStateInput = (property: string): property is keyof TStateInput => {
	return true;
};

const isKeyofStateCharge = (property: string): property is keyof TStateCharge => {
	return true;
};

// %%% Props %%%
type TFormContentsProps = {
	users: TUser[];
	addBill: (bill: TBill) => void;
	initialStateInput: TStateInput;
	initialStateCharge: TStateCharge;
	isNewBill: boolean;
	callUpModal: (heading: string, body: string) => void;
};

// %%% Reducer %%%
const FormContents = ({
	users,
	addBill,
	initialStateInput,
	initialStateCharge,
	isNewBill,
	callUpModal,
}: TFormContentsProps) => {
	// const [stateModal, setStateModal] = useState<TModalControl>(initialStateModal);
	const [stateInput, setStateInput] = useState<TStateInput>(initialStateInput);
	const [stateCharge, setStateCharge] = useState<TStateCharge>(initialStateCharge);

	// Functions related to modal
	// const handleShow = useCallback(() => {
	// 	setStateModal({
	// 		...stateModal,
	// 		show: true,
	// 	});
	// }, [stateModal]);

	// const handleClose = useCallback(() => {
	// 	setStateModal({
	// 		...stateModal,
	// 		show: false,
	// 	});
	// }, [stateModal]);

	// const callUpModal = useCallback((heading: string, body: string) => {
	// 	setStateModal({
	// 		heading,
	// 		body,
	// 		show: true,
	// 	});
	// }, []);

	// Functions on building users dictionary
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

	// Functions on Change Event
	const onChangeText = useCallback(
		(e: ChangeEvent<FormControlElement>) => {
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
				let target: keyof TStateCharge = 'amountA';
				switch (name) {
					case 'chargeA':
						target = 'amountA';
						break;
					case 'chargeB':
						target = 'amountB';
						break;
					case 'chargeC':
						target = 'amountC';
						break;
					case 'chargeD':
						target = 'amountD';
						break;
				}
				const targetAmount = e.target.checked ? stateCharge[target] : 0;
				const newStateCharge = {
					...stateCharge,
					[name]: e.target.checked,
					[target]: targetAmount,
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

	const onDivide = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			const { chargeA, chargeB, chargeC, chargeD } = stateCharge;
			const cost = stateInput.cost;
			const num_members = Number(chargeA) + Number(chargeB) + Number(chargeC) + Number(chargeD);

			if (cost < 1) callUpModal('ERROR', 'Not was the cost offered');
			if (num_members < 1) callUpModal('ERROR', 'The charged members have to be at least 1');

			const amount = Math.floor(cost / num_members);
			let remainder = cost % num_members;
			let amountA = chargeA ? amount : 0;
			let amountB = chargeB ? amount : 0;
			let amountC = chargeC ? amount : 0;
			let amountD = chargeD ? amount : 0;

			if (remainder > 0 && chargeA) {
				amountA += 1;
				remainder -= 1;
			}
			if (remainder > 0 && chargeB) {
				amountB += 1;
				remainder -= 1;
			}
			if (remainder > 0 && chargeC) {
				amountC += 1;
				remainder -= 1;
			}
			if (remainder > 0 && chargeD) {
				amountD += 1;
				remainder -= 1;
			}

			const newStateCharge = {
				...stateCharge,
				amountA,
				amountB,
				amountC,
				amountD,
			};

			setStateCharge(newStateCharge);
		},
		[callUpModal, stateCharge, stateInput.cost]
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
			if (name === 'expired') {
				const newStateInput = {
					...stateInput,
					[name]: e.target.checked,
				};
				setStateInput(newStateInput);
			} else {
				throw Error('ERROR: Type Incompatiable in onChangeExpiry(e)');
			}
		},
		[stateInput]
	);

	const onCancel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		const bill: TBill = {
			index: -7391,
			title: '',
			when: '',
			paidBy: '',
			cost: 0,
			charge: {
				A: 0,
				B: 0,
				C: 0,
				D: 0,
			},
			expired: false,
			createdAt: '',
			updatedAt: '',
		};
		addBill(bill);
	}, []);

	const onSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const { index, title, when, paidBy, cost, expired } = stateInput;
			const { amountA, amountB, amountC, amountD } = stateCharge;
			const cond1 = Boolean(title) && Boolean(paidBy) && Boolean(when) && Boolean(cost);
			if (!cond1) {
				callUpModal('WARNING', 'You have to fill up all the information');
				return;
			}
			const [coI, amA, amB, amC, amD] = [
				Number(cost),
				Number(amountA),
				Number(amountB),
				Number(amountC),
				Number(amountD),
			];
			console.log(coI, amA + amB + amC + amD);
			const cond3 =
				Number.isInteger(coI) &&
				Number.isInteger(amA) &&
				Number.isInteger(amB) &&
				Number.isInteger(amC) &&
				Number.isInteger(amD);
			if (!cond3) {
				callUpModal('WARNING', 'The least unit of cost should be 1');
				return;
			}
			const cond2 = coI === amA + amB + amC + amD;
			if (!cond2) {
				callUpModal('WARNING', 'Cost have to be distributed to all');
				return;
			}
			const date = new Date();
			const dateString = date.toString();
			const bill: TBill = {
				index,
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
			addBill(bill);
			setStateInput(initialStateInput);
			setStateCharge(initialStateCharge);
			callUpModal('INFO', 'Your bill was registered successfully');
			return;
		},
		[addBill, callUpModal, initialStateCharge, initialStateInput, stateCharge, stateInput]
	);

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>INDEX: The order of the bill</Form.Label>
					<InputGroup>
						<InputGroup.Text>#</InputGroup.Text>
						<Form.Control type="number" name="index" value={stateInput.index} disabled />
					</InputGroup>
				</Form.Group>
				<hr />
				<Form.Group className="mb-3">
					<Form.Label>TITLE: Brief explanation of payment</Form.Label>
					<Form.Control
						name="title"
						value={stateInput.title}
						onChange={onChangeText}
						placeholder="e.g. Shinkansen Express Ticket"
					/>
				</Form.Group>
				<hr />
				<Form.Group className="mb-3">
					<Form.Label>WHEN: The time when of the payment</Form.Label>
					<Form.Control
						name="when"
						value={stateInput.when}
						onChange={onChangeText}
						placeholder="e.g. 2023-04-30"
					/>
				</Form.Group>
				<hr />
				<Form.Group className="mb-3">
					<Form.Label>WHO: Who paid instead</Form.Label>
					<Form.Select name="paidBy" onChange={onSelect} value={stateInput.paidBy}>
						<option value="">Open this select menu</option>
						<option value="A">{dictUsers['A']}</option>
						<option value="B">{dictUsers['B']}</option>
						<option value="C">{dictUsers['C']}</option>
						<option value="D">{dictUsers['D']}</option>
					</Form.Select>
				</Form.Group>
				<hr />
				<Form.Group className="mb-3">
					<Form.Label>AMOUNT: The price you paid</Form.Label>
					<InputGroup>
						<InputGroup.Text>￦</InputGroup.Text>
						<Form.Control
							type="number"
							name="cost"
							value={stateInput.cost}
							onChange={onChangeText}
							placeholder="e.g. 50000"
						/>
					</InputGroup>
				</Form.Group>
				<hr />
				<Form.Group className="mb-3">
					<Form.Label>CHARGE: Check who you wants to get returned from</Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Checkbox
							name="chargeA"
							checked={stateCharge.chargeA}
							onChange={onChangeCharge}></InputGroup.Checkbox>
						<InputGroup.Text>
							<div className="text-center" style={{ width: '6rem' }}>
								{dictUsers['A']}
							</div>
						</InputGroup.Text>
						<Form.Control
							name="amountA"
							disabled={!stateCharge.chargeA}
							value={stateCharge.amountA}
							onChange={onChangeAmount}
							placeholder="e.g. 20000"
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Checkbox
							name="chargeB"
							checked={stateCharge.chargeB}
							onChange={onChangeCharge}></InputGroup.Checkbox>
						<InputGroup.Text>
							<div className="text-center" style={{ width: '6rem' }}>
								{dictUsers['B']}
							</div>
						</InputGroup.Text>
						<Form.Control
							name="amountB"
							disabled={!stateCharge.chargeB}
							value={stateCharge.amountB}
							onChange={onChangeAmount}
							placeholder="e.g. 15000"
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Checkbox
							name="chargeC"
							checked={stateCharge.chargeC}
							onChange={onChangeCharge}></InputGroup.Checkbox>
						<InputGroup.Text>
							<div className="text-center" style={{ width: '6rem' }}>
								{dictUsers['C']}
							</div>
						</InputGroup.Text>
						<Form.Control
							name="amountC"
							disabled={!stateCharge.chargeC}
							value={stateCharge.amountC}
							onChange={onChangeAmount}
							placeholder="e.g. 10000"
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Checkbox
							name="chargeD"
							checked={stateCharge.chargeD}
							onChange={onChangeCharge}></InputGroup.Checkbox>
						<InputGroup.Text>
							<div className="text-center" style={{ width: '6rem' }}>
								{dictUsers['D']}
							</div>
						</InputGroup.Text>
						<Form.Control
							name="amountD"
							disabled={!stateCharge.chargeD}
							value={stateCharge.amountD}
							onChange={onChangeAmount}
							placeholder="e.g. 5000"
						/>
					</InputGroup>
					<Form.Label>Divide Equally: Divide the bill equally with all charged members</Form.Label>
					<InputGroup>
						<Button variant="outline-primary" onClick={onDivide}>
							DIVIDE
						</Button>
					</InputGroup>
				</Form.Group>
				<hr />
				<Form.Group className="mb-3">
					<Form.Label>EXPIRED: Check if this bill was already paid</Form.Label>
					<InputGroup>
						<InputGroup.Checkbox name="expired" checked={stateInput.expired} onChange={onChangeExpiry} />
						<Form.Control
							readOnly
							value={
								stateInput.expired
									? 'This bill was already paid'
									: 'This bill will charge the chosen members'
							}
						/>
					</InputGroup>
				</Form.Group>
				<Button name="submit" variant="primary" type="submit">
					SUBMIT
				</Button>
				{!isNewBill && (
					<Button name="cancel" className="mx-2" variant="outline-danger" type="button" onClick={onCancel}>
						CANCEL
					</Button>
				)}
			</Form>
		</div>
	);
};

export default FormContents;
