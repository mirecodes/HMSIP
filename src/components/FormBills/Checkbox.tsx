import React from 'react';

// %%% Models %%%
type TCheckbox = {
	children: string;
	disabled: boolean;
	checked: boolean;
	// onChange: () => ();
};

const Checkbox = ({ children, disabled, checked }: TCheckbox) => {
	return (
		<label>
			<input type="checkbox" disabled={disabled} checked={checked} />
			{children}
		</label>
	);
};

export default Checkbox;
