import { ChangeEvent, FormEvent, MouseEvent, useCallback, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { TBill } from '../../models/TBill';
import ModalComponent, { TModalControl, initialStateModal } from '../Modal/ModalComponent';

// %%% Models %%%
type TStateInput = {
	index: number;
	title: string;
	when: string;
	paidBy: string;
	cost: number;
	expired: boolean;
};

const initialStateInput: TStateInput = {
	index: -1,
	title: '',
	when: '',
	paidBy: '',
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

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

// %%% Type Checking %%%
const isKeyofStateInput = (property: string): property is keyof TStateInput => {
	return true;
};

const isKeyofStateCharge = (property: string): property is keyof TStateCharge => {
	return true;
};

type TFormContentsProps = {
	onAddBill: (bill: TBill) => void;
};

const FormContents = ({ onAddBill }: TFormContentsProps) => {
	const [stateInput, setStateInput] = useState<TStateInput>(initialStateInput);
	const [stateCharge, setStateCharge] = useState<TStateCharge>(initialStateCharge);
	const [stateModal, setStateModal] = useState<TModalControl>(initialStateModal);

	const handleShow = useCallback(() => {
		setStateModal({
			...stateModal,
			show: true,
		});
	}, [stateModal]);

	const handleClose = useCallback(() => {
		setStateModal({
			...stateModal,
			show: false,
		});
	}, [stateModal]);

	const callUpModal = useCallback((heading: string, body: string) => {
		setStateModal({
			heading,
			body,
			show: true,
		});
	}, []);

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
			let amountA = chargeA ? amount + (cost % num_members) : 0;
			let amountB = chargeB ? amount + (cost % num_members) : 0;
			let amountC = chargeC ? amount + (cost % num_members) : 0;
			let amountD = chargeD ? amount + (cost % num_members) : 0;

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
			<ModalComponent
				heading={stateModal.heading}
				body={stateModal.body}
				handleShow={handleShow}
				handleClose={handleClose}
				show={stateModal.show}
			/>
			<Form onSubmit={onSubmit}>
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
						<option value="A">One</option>
						<option value="B">Two</option>
						<option value="C">Three</option>
						<option value="D">Four Bubble</option>
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
						<InputGroup.Text>charge A</InputGroup.Text>
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
						<InputGroup.Text>charge B</InputGroup.Text>
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
						<InputGroup.Text>charge C</InputGroup.Text>
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
						<InputGroup.Text>charge D</InputGroup.Text>
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
			</Form>
		</div>
	);
};

export default FormContents;
