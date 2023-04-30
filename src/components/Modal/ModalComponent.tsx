import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type TModalControl = {
	show: boolean;
	heading: string;
	body: string;
};

export const initialStateModal = {
	show: false,
	heading: '',
	body: '',
};

type TModalComponentProps = {
	heading: string;
	body: string;
	show: boolean;
	handleShow: () => void;
	handleClose: () => void;
};

function ModalComponent({ heading, body, show, handleShow, handleClose }: TModalComponentProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{heading}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleClose}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalComponent;
