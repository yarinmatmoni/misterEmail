import './hamburger.scss';

export const Hamburger = ({ onToggleMenu, isMenuOpen }) => {
	return (
		<div className='hamburger' onClick={onToggleMenu} data-open={isMenuOpen}>
			<span className='line' />
			<span className='line' />
			<span className='line' />
		</div>
	);
};
