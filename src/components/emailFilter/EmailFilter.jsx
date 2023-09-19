import { useEffect, useState } from 'react';
import './emailFilter.scss';

export const EmailFilter = ({ filterBy, onSetFilter }) => {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

	useEffect(() => {
		onSetFilter(filterByToEdit);
	}, [filterByToEdit]);

	const handleChange = (event) => {
		let { value, name: filedName } = event.target;
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [filedName]: value }));
	};

	return (
		<form className='email-filter'>
			<input
				type='text'
				placeholder='Search mail'
				name='inputSearch'
				value={filterByToEdit.inputSearch}
				onChange={handleChange}
				autoComplete='off'
			/>
			<div className='checkbox-filter'>
				<input
					type='checkbox'
					id='all'
					name='mailStatus'
					onChange={handleChange}
					value={'all'}
					checked={filterByToEdit.mailStatus === 'all'}
				></input>
				<label htmlFor='all'>All</label>
				<input
					type='checkbox'
					id='read'
					name='mailStatus'
					onChange={handleChange}
					value={'read'}
					checked={filterByToEdit.mailStatus === 'read'}
				></input>
				<label htmlFor='read'>Read</label>
				<input
					type='checkbox'
					id='unread'
					name='mailStatus'
					onChange={handleChange}
					value={'unread'}
					checked={filterByToEdit.mailStatus === 'unread'}
				></input>
				<label htmlFor='unread'>Unread</label>
			</div>
		</form>
	);
};
