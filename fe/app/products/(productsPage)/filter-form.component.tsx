'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDownICon } from '@assets/icon';
import { FormEvent } from 'react';
import Button from '@components/button/button.component';

const FilterForm = () => {
	const router = useRouter();
	const [sort, setSort] = useState<string>('');
	const [numberOfItems, setNumberOfItems] = useState<number>(0);
	const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

	const onSort = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!sort || !numberOfItems) return;
		router.push(`/products/filter/${sort}/${direction}/${numberOfItems}/1`);
	};

	return (
		<form className='flex flex-col gap-5' onSubmit={onSort}>
			<div className='flex gap-3 items-center justify-center'>
				<div className='w-max sm:w-auto md:w-max rounded-lg border-2 border-orange-400 px-2 py-1 focus-within:border-orange-500 h-10'>
					<select
						name='size'
						id='size'
						className='h-full w-20 outline-none peer'
						value={sort}
						onChange={(e) => setSort(e.target.value)}
					>
						<option value=''>Sort by</option>
						<option value='ratings'>Ratings</option>
						<option value='name'>Name</option>
						<option value='price'>Price</option>
					</select>
				</div>
				<div
					className={`rounded-full text-orange-400 flex items-center justify-center border-2 border-orange-400 w-10 h-10 cursor-pointer p-[6px] hover:opacity-80 transition-all hover:bg-orange-100/50 ${
						direction === 'asc' && 'rotate-180'
					}`}
					onClick={() => setDirection(direction === 'asc' ? 'desc' : 'asc')}
				>
					<ArrowDownICon />
				</div>
			</div>
			<div className='w-max sm:w-auto md:w-max rounded-lg border-2 border-orange-400 px-2 py-1 focus-within:border-orange-500 h-10'>
				<select
					name='size'
					id='size'
					className='h-full outline-none peer'
					value={numberOfItems}
					onChange={(e) => setNumberOfItems(Number(e.target.value))}
				>
					<option value={0}>Items per page</option>
					<option value={6}>6</option>
					<option value={12}>12</option>
					<option value={24}>24</option>
				</select>
			</div>
			<Button type='submit' role='primary'>
				Sort
			</Button>
		</form>
	);
};

export default FilterForm;
