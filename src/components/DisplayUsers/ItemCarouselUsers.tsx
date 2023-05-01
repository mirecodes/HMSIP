import React from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { TUser } from '../../models/TUser';

type TItemCarouselUsersProps = {
	user: TUser;
};

const ItemCarouselUsers = ({ user }: TItemCarouselUsersProps) => {
	return (
		<div>
			<Card className="bg-light" text="dark">
				<Row className="no-gutters">
					<Col className="sm-6">
						<Card.Img src={user.imageURL} />
					</Col>
					<Col className="sm-6">
						<Card.Body>
							<Card.Title>{user.name}'s Finantial Information</Card.Title>
							<Card.Text>
								<p></p>
								<p>SPENT: ₩ {user.spent}</p>
								<p>OWED: ₩ {user.owed}</p>
								<p>DIFF: ₩ {user.difference}</p>
							</Card.Text>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default ItemCarouselUsers;
