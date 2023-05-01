import React from 'react';
import CarouselUsers from './CarouselUsers';
import { Container, Row } from 'react-bootstrap';
import { TUser } from '../../models/TUser';

type TFrameUsersProps = {
	users: TUser[];
};
const FrameUsers = ({ users }: TFrameUsersProps) => {
	return (
		<Container>
			<Row className="justify-content-center">
				<CarouselUsers users={users} />
			</Row>
		</Container>
	);
};

export default FrameUsers;
