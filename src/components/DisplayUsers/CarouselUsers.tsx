import React, { useCallback, useMemo } from 'react';
import ItemCarouselUsers from './ItemCarouselUsers';
import Carousel from 'react-bootstrap/esm/Carousel';
import { TUser, TUserCode } from '../../models/TUser';

type TCarouselUsersProps = {
	users: TUser[];
};

const CarouselUsers = ({ users }: TCarouselUsersProps) => {
	return (
		<Carousel className="mt-4" style={{ maxWidth: '800px' }}>
			{users.map((user) => (
				<Carousel.Item interval={10000}>
					<ItemCarouselUsers user={user} />
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default CarouselUsers;
