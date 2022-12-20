export interface ISpinnerProps {
	size?: string;
}

const Spinner = ({ size = 'w-10 h-10' }) => {
	return (
		<div className={`${size}`}>
			<div className='bg-white border-t-black border-4 w-full h-full rounded-full animate-spin'></div>
		</div>
	);
};

export default Spinner;
