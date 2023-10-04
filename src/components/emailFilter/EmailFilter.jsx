import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import expandArrow from '../../assets/svgs/expand-arrow.svg';
import trash from '../../assets/svgs/trash.svg';
import star from '../../assets/svgs/empty-star.svg';
import unRead from '../../assets/svgs/unRead.svg';
import './emailFilter.scss';

export const EmailFilter = ({
	filterBy,
	onSetFilter,
	sortBy,
	onSetSort,
	onSelectAllEmails,
	selectedMailsSize,
	updateAllSelectedEmails,
}) => {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
	const [sortByToEdit, setSortByToEdit] = useState(sortBy);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const { folder } = useParams();

	useEffect(() => {
		onSetFilter(filterByToEdit);
	}, [filterByToEdit]);

	useEffect(() => {
		onSetSort(sortByToEdit);
	}, [sortByToEdit]);

	useEffect(() => {
		onSelectAllEmails(isSelectedAll);
	}, [isSelectedAll]);

	useEffect(() => {
		setIsSelectedAll(false);
	}, [folder]);

	const handleChange = (event) => {
		let { value, name: filedName } = event.target;
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [filedName]: value }));
	};

	const handleSort = (event) => {
		let { value, name: filedName } = event.target;
		value = +value * -1;
		setSortByToEdit((prevSort) => ({ ...prevSort, [filedName]: value }));
	};

	const handleOnCheck = () => {
		setIsSelectedAll(!isSelectedAll);
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
				<input type='checkbox' onChange={handleOnCheck} checked={isSelectedAll} />
				{selectedMailsSize > 0 && (
					<div className='multi-select-options'>
						<img src={trash} alt='Delete' />
						<img src={star} alt='Empty star' onClick={() => updateAllSelectedEmails({ isStarred: true })} />
						<img src={unRead} alt='UnRead Email' />
					</div>
				)}
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
