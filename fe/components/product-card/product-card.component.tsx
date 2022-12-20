import Link from 'next/link';
import { FC } from 'react';
import Button from '../button/button.component';
import Slider from '../slider/slider.component';
import { formatPrice } from '../../utils/utils';

export interface IProductCardProps {
	image?: {
		src: string;
		alt: string;
	}[];
	title: string;
	description?: string;
	price?: string;
	id: string;
}

export const SkeletonProductCard = () => {
	return (
		<div className='p-5 flex-auto md:flex-none md:basis-1/2 lg:basis-1/3'>
			<div className='bg-white rounded-lg shadow-md p-5 group transition-transform flex flex-col h-full'>
				<div className='animate-pulse'>
					<div className='w-full h-64 overflow-hidden rounded-lg bg-gray-300'></div>
					<div className='mt-5 flex-col flex-1 flex'>
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

const ProductCard: FC<IProductCardProps> = ({ id, image, title, description, price }) => {
	return (
		<div className='p-5 flex-auto md:flex-none md:basis-1/2 lg:basis-1/3'>
			<div className='bg-white rounded-lg shadow-md p-5 group hover:scale-105 transition-transform flex flex-col h-full'>
				{image && <Slider images={image} height='h-64' animateOnHover={true} />}
				<div className='mt-5 flex-col flex-1 flex'>
					<Link href={`/products/${id}`}>
						<h3 className='text-lg font-semibold text-orange-500'>{title}</h3>
					</Link>
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
