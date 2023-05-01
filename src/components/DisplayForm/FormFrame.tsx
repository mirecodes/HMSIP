import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import FormContents from './FormContents';
import { TBill } from '../../models/TBill';
import { TUser } from '../../models/TUser';

type TFormFrameProps = {
	users: TUser[];
	addBill: (bill: TBill) => void;
};

const FormFrame = ({ users, addBill }: TFormFrameProps) => {
	return (
		<div>
			<Container>
				<Card className="my-3 shadow bg-body rounded">
					<Card.Header className="py-3" as="h4">
						Register Your Bill🧾
					</Card.Header>
					<Card.Body>
						<FormContents users={users} addBill={addBill} />
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
};

export default FormFrame;
