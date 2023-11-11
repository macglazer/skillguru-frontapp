import React, {useMemo} from 'react';

const SessionItem = (props) => {
	const {id, description, minutes, price, currentSession, onChangeHandler} = props;
	const isChecked = useMemo(() => currentSession === id, [currentSession, id]);


	return (
		<li className='session__list-item'>
			<label data-selected={isChecked}>
				<input
					type='radio'
					name='session-type'
					id={id}
					checked={isChecked}
					onChange={() => onChangeHandler(id)}
				/>
				<span className='session__info'>
					{id} <br />
					<small>
						{minutes} minut, {price} zł za sesję
					</small>
				</span>
			</label>
		</li>
	);
};

export default SessionItem;