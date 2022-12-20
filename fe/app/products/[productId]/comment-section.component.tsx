import { FC } from 'react';
import { IComment } from '../../../pages/api/products/[productId]';
import Image from 'next/image';
import Button from '../../../components/button/button.component';

const Comment: FC<IComment> = ({ comment, profile, user, rating }) => (
	<div className='p-5 flex-auto md:flex-none md:basis-1/2 h-full'>
		<div className='bg-white p-5 flex shadow-md rounded-lg flex-col gap-3'>
			<div className='flex gap-3 items-center'>
				<div className='relative rounded-full overflow-hidden h-10 w-10'>
					<Image src={profile} alt={user} fill />
				</div>
				<div className='text-lg font-bold text-orange-400'>{user}</div>
			</div>
			<div className=''>{rating}</div>
			<div className=''>{comment}</div>
		</div>
	</div>
);

export interface ICommentSectionProps {
	comments: IComment[];
}

const CommentSection: FC<ICommentSectionProps> = ({ comments }) => {
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Comments</h2>
			<div className='flex flex-col mt-3 mb-5 gap-3'>
				<h3 className='font-semibold text-gray-400'>Leave your comment</h3>
				<textarea
					className='rounded-lg shadow-md p-3'
					placeholder='Amazing good job!...'
					style={{ resize: 'vertical' }}
					rows={3}
					minLength={10}
				/>
				<Button style={{ alignSelf: 'flex-end' }} type='button' role='primary' variant='filled'>
					Send
				</Button>
			</div>
			<div className='flex flex-wrap justify-center'>
				{comments.map((comment, index) => (
					<Comment key={`comment_${comment}_${index}`} {...comment} />
				))}
			</div>
		</div>
	);
};

export default CommentSection;
