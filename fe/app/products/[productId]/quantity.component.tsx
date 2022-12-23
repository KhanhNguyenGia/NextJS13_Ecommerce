'use client';

import { useState } from 'react';
import Button from '../../../components/button/button.component';
import { formatPrice } from '../../../utils/utils';

const Quantity = ({ price }: { price: string }) => {
	const [quantity, setQuantity] = useState(1);
	const [sizes, setSizes] = useState('S');

	return (
		<div className='flex gap-5 my-5 justify-center md:flex-col'>
			<div className='md:w-max rounded-lg border-2 border-orange-400 px-2 py-1 focus-within:border-orange-500 h-10'>
				<select name='size' id='size' className='h-full w-16 outline-none peer'>
					<option value='XS'>XS</option>
					<option value='S'>S</option>
					<option value='M'>M</option>
					<option value='L'>L</option>
					<option value='XL'>XL</option>
					<option value='2XL'>2XL</option>
				</select>
			</div>
			<div className='flex gap-3 justify-center font-bold'>
				<Button
					type='button'
					role='primary'
					onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
					// onClick={() => (quantity.current = Math.max(quantity.current - 1, 1))}
				>
					-
				</Button>
				<input
					className='px-5 py-1 text-center border-2 border-orange-400 rounded-lg flex-auto focus:border-orange-500 outline-none'
					type='number'
					min={1}
					max={10}
					value={quantity}
					// value={quantity.current}
					onChange={(e) => setQuantity(Number(e.target.value))}
					// onChange={(e) => (quantity.current = Number(e.target.value))}
				/>
				<Button
					type='button'
					role='primary'
					onClick={() => setQuantity((prev) => Math.min(prev + 1, 10))}
					// onClick={() => (quantity.current = Math.min(quantity.current + 1, 10))}
				>
					+
				</Button>
			</div>
			<Button type='button' role='primary' variant='filled'>
				Add to cart {formatPrice(Number(price) * quantity)}
			</Button>
		</div>
	);
};

export default Quantity;
