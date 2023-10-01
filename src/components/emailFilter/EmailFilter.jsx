import { useEffect, useState } from 'react';
import expandArrow from '../../assets/svgs/expand-arrow.svg';
import './emailFilter.scss';

export const EmailFilter = ({ filterBy, onSetFilter, sortBy, onSetSort }) => {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
	const [sortByToEdit, setSortByToEdit] = useState(sortBy);

	useEffect(() => {
		onSetFilter(filterByToEdit);
	}, [filterByToEdit]);

	useEffect(() => {
		onSetSort(sortByToEdit);
	}, [sortByToEdit]);

	const handleChange = (event) => {
		let { value, name: filedName } = event.target;
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [filedName]: value }));
	};

	const handleSort = (event) => {
		let { value, name: filedName } = event.target;
		value = +value * -1;
		setSortByToEdit((prevSort) => ({ ...prevSort, [filedName]: value }));
	};

	return (
		<div className='email-filter-sort-container'>
			<input
				type='text'
				placeholder='Search mail'
				name='inputSearch'
				value={filterByToEdit.inputSearch}
				onChange={handleChange}
				autoComplete='off'
			/>
			<div className='checkbox-filter-sort'>
				<input type='checkbox' />
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
				<div className='sort-container'>
					<button onClick={handleSort} name='date' value={sortBy.date}>
						Date
						<img src={expandArrow} alt='arrow' data-arrow={sortByToEdit.date} />
					</button>
					<button onClick={handleSort} name='subject' value={sortBy.subject}>
						Subject
						<img src={expandArrow} alt='arrow' data-arrow={sortByToEdit.subject} />
					</button>
				</div>
			</div>
		</div>
	);
};
