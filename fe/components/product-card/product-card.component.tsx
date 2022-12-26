import Link from 'next/link';
import { FC } from 'react';
import Button from '@components/button/button.component';
import Slider from '@components/slider/slider.component';
import { formatPrice } from '@utils/utils';
import { ProductRating } from '@interface/product.interface';
import { StarIconFilled, StarIconOutlined } from '@assets/icon';

export interface IProductCardProps {
	image?: {
		src: string;
		alt: string;
	}[];
	title: string;
	description?: string;
	price?: string | number;
	id: string;
	ratings?: ProductRating;
}

export const SkeletonProductCard = () => {
	return (
		<div className='p-5 w-full md:w-1/2 lg:w-1/3'>
			<div className='bg-white rounded-lg shadow-md group transition-transform flex flex-col h-full overflow-hidden'>
				<div className='animate-pulse'>
					<div className='w-full h-64 overflow-hidden bg-gray-300'></div>
					<div className='p-5 flex-col flex-1 flex'>
						<h3 className='h-4 bg-gray-300 max-w-[50%] rounded-md'></h3>
						<p className='mt-2 mb-1 bg-gray-300 h-4 rounded-md'></p>
						<p className='my-1 bg-gray-300 h-4 rounded-md'></p>
						<p className='mb-5 mt-1 bg-gray-300 h-4 rounded-md'></p>
						<div className='flex justify-between mt-auto items-center'>
							<div className='h-4 bg-gray-300 w-1/2 rounded-md'></div>
							<Button variant='filled' role='primary' type='button' disabled={true}>
								Add
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProductCard: FC<IProductCardProps> = ({ id, image, title, description, price, ratings }) => {
	return (
		<div className='p-5 flex-auto md:flex-none md:basis-1/2 lg:basis-1/3'>
			<div className='bg-white rounded-lg shadow-md group hover:scale-105 transition-transform flex flex-col h-full overflow-hidden'>
				{image && <Slider images={image} height='h-64' animateOnHover={true} />}
				<div className='p-5 flex-col flex-1 flex'>
					<Link href={`/products/${id}`}>
						<h3 className='text-lg font-semibold text-orange-500'>{title}</h3>
					</Link>
					{ratings && (
						<div className='flex gap-2 text-yellow-500 items-center'>
							{Array.from(Array(5)).map((_, i) =>
								i <= Math.round(Number(ratings.overall)) ? (
									<StarIconFilled key={`stars_${i}`} />
								) : (
									<StarIconOutlined key={`stars_${i}`} />
								)
							)}{' '}
							<div className='text-gray-500 text-xs'>({ratings.count})</div>{' '}
						</div>
					)}
					{description && <p className='mt-2 mb-5 text-gray-500 line-clamp-3'>{description}</p>}
					{price && (
						<div className='flex justify-between mt-auto items-center'>
							<div className='text-lg font-semibold'>{formatPrice(price)}</div>
							<Button variant='filled' role='primary' type='button'>
								Add
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
