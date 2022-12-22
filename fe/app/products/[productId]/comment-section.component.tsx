'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import Button from '../../../components/button/button.component';
import { ProductComment } from '../../../interface/product.interface';
import { StarIconFilled, StarIconOutlined } from '../../../assets/icon';

const Comment: FC<ProductComment> = ({ comment, profile, user, rating }) => (
	<div className='p-5 flex-auto md:flex-none md:basis-1/2 h-full'>
		<div className='bg-white p-5 flex shadow-md rounded-lg flex-col gap-3'>
			<div className='flex gap-3 items-center'>
				<div className='relative rounded-full overflow-hidden h-10 w-10'>
					<Image src={profile} alt={user} fill />
				</div>
				<div className='text-lg font-bold text-orange-400'>{user}</div>
			</div>
			<div className='flex gap-2 text-yellow-400'>
				{Array.from(Array(5)).map((_, i) =>
					i <= Math.round(Number(rating)) ? (
						<StarIconFilled key={`stars_${i}`} />
					) : (
						<StarIconOutlined key={`stars_${i}`} />
					)
				)}
			</div>
			<div className=''>{comment}</div>
		</div>
	</div>
);

export interface ICommentSectionProps {
	comments: ProductComment[];
}

const CommentSection: FC<ICommentSectionProps> = ({ comments }) => {
	const [currentHover, setCurrentHover] = useState(-1);
	const [current, setCurrent] = useState(-1);

	const onStarHover = (e: React.MouseEvent<SVGElement, MouseEvent>, index: number) => {
		setCurrentHover(index);
	};

	const onStarLeave = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		setCurrentHover(current);
	};

	const onStarClick = (e: React.MouseEvent<SVGElement, MouseEvent>, index: number) => {
		setCurrent(index);
		setCurrentHover(index);
	};

	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold px-5'>Comments</h2>
			<div className='flex flex-col mt-3 mb-5 gap-3 px-5'>
				<h3 className='font-semibold text-gray-400'>Leave your comment</h3>
				<div className='flex text-yellow-500 cursor-pointer'>
					{/* STARS HERE */}
					{Array.from(Array(5)).map((_, i) =>
						i <= currentHover ? (
							<StarIconFilled
								sizes='w-10 h-10'
								className='px-1'
								key={`stars_${i + 1}`}
								onMouseEnter={(e) => onStarHover(e, i)}
								onMouseLeave={onStarLeave}
								onClick={(e) => onStarClick(e, i)}
							/>
						) : (
							<StarIconOutlined
								sizes='w-10 h-10'
								className='px-1'
								key={`stars_${i + 1}`}
								onMouseEnter={(e) => onStarHover(e, i)}
								onMouseLeave={onStarLeave}
								onClick={(e) => onStarClick(e, i)}
							/>
						)
					)}
				</div>
				<textarea
					className='rounded-lg shadow-md p-3 outline-none'
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
