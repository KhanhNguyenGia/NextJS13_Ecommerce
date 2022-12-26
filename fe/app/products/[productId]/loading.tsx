import { StarIconFilled } from '@assets/icon';
import { SkeletonSlider } from '@components/slider/slider.component';

const Loading = () => {
	return (
		<div className='flex gap-5 flex-col'>
			<div className='flex gap-5 flex-col md:flex-row px-5'>
				<div className='flex-[6] flex flex-col'>
					<SkeletonSlider />
				</div>
				<div className='flex-[2] flex flex-col bg-white rounded-lg shadow-md p-5 '>
					<div className='w-full h-full animate-pulse'>
						<h2 className='w-1/2 h-8 bg-gray-500 rounded-lg'></h2>
						<div className='flex gap-2 h-5 rounded-lg mt-2'>
							<div className='flex gap-2 text-gray-500 items-center'>
								{Array.from(Array(5)).map((_, i) => (
									<StarIconFilled key={`stars_${i}`} sizes='w-7 h-7' />
								))}{' '}
								<div className='flex items-center w-1/3 bg-gray-500 h-4 rounded-lg'></div>
							</div>
						</div>

						<p className='mt-2 mb-5 w-full h-4 rounded-lg bg-gray-500'></p>
						<p className='mt-2 mb-5 w-full h-4 rounded-lg bg-gray-500'></p>
						<p className='mt-2 mb-5 w-full h-4 rounded-lg bg-gray-500'></p>
						<h3 className='w-1/3 h-7'></h3>
						<div className='w-full bg-gray-500 h-10 rounded-lg'></div>
					</div>
				</div>
			</div>
			{/* <CommentSection comments={product.comments} /> */}
			<div className='flex flex-col gap-3 animate-pulse p-5'>
				<div className='h-7 w-1/3 bg-gray-500 rounded-lg'></div>
				<div className='w-full h-20 bg-gray-500 rounded-lg'></div>
				<div className='bg-gray-500 rounded-lg w-1/6 h-10 self-end'></div>
			</div>
			<div className='flex flex-col gap-5 animate-pulse p-5'>
				{Array.from(Array(3)).map((_, i) => (
					<div className='bg-gray-500 w-full h-28 rounded-lg' key={`skeleton_comment_${i}`}></div>
				))}
			</div>
		</div>
	);
};

export default Loading;
