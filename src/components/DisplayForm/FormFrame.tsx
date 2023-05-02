import React, { useCallback, useState } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import FormContents, { TStateInput, TStateCharge } from './FormContents';
import { TBill } from '../../models/TBill';
import { TUser } from '../../models/TUser';
import ModalComponent, { TModalControl, initialStateModal } from '../Modal/ModalComponent';

type TFormFrameProps = {
	users: TUser[];
	addBill: (bill: TBill) => void;
	initialStateInput: TStateInput;
	initialStateCharge: TStateCharge;
	isNewBill: boolean;
	cardTitle: string;
};

const FormFrame = ({
	users,
	addBill,
	initialStateInput,
	initialStateCharge,
	isNewBill,
	cardTitle,
}: TFormFrameProps) => {
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

	return (
		<div>
			<ModalComponent
				heading={stateModal.heading}
				body={stateModal.body}
				handleShow={handleShow}
				handleClose={handleClose}
				show={stateModal.show}
			/>
			<Container>
				<Card className="my-3 shadow bg-body rounded">
					<Card.Header className="py-3" as="h4">
						{cardTitle}🧾
					</Card.Header>
					<Card.Body>
						<FormContents
							users={users}
							addBill={addBill}
							initialStateInput={initialStateInput}
							initialStateCharge={initialStateCharge}
							isNewBill={isNewBill}
							callUpModal={callUpModal}
						/>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
};

export default FormFrame;
