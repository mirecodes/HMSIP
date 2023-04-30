import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import FormContents from './FormContents';
import { TBill } from '../../models/TBill';

type TFormFrameProps = {
	onAddBill: (bill: TBill) => void;
};

const FormFrame = ({ onAddBill }: TFormFrameProps) => {
	return (
		<div>
			<Container>
				<Card className="my-3 shadow bg-body rounded">
					<Card.Header className="py-3" as="h4">
						Register Your Bill🧾
					</Card.Header>
					<Card.Body>
						<FormContents onAddBill={onAddBill} />
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
};

export default FormFrame;
