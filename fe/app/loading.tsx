import Spinner from '@components/spinner/spinner.component';

const Loading = () => {
	return (
		<div className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-white z-50'>
			<Spinner size='w-16 h-16' />
		</div>
	);
};

export default Loading;
