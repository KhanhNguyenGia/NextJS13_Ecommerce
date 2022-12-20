'use client';

import { FormEvent, useRef } from 'react';
import Button from '../../../components/button/button.component';

const FILTER_OPTIONS = [
	'Names',
	'Recently added',
	'Popularity',
	'Rating',
	'Recommended',
	'Brands',
	'Color',
];

const FilterForm = () => {
	const ref = useRef('name');
	// const filter = (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	// const res = await fetch(`/products?filter=${ref.current}`, {
	// 	// 	method: 'GET',
	// 	// });
	// 	console.log(1);
	// };
	return (
		<form className='flex ml-auto gap-3 px-5'>
			<div className='px-3 py-2 shadow-md rounded-lg h-max bg-white'>
				<select
					id='filter-select'
					className='outline-none bg-transparent'
					name='filter-select'
					defaultValue='names'
					onChange={(e) => (ref.current = e.target.value)}
				>
					{FILTER_OPTIONS.map((opt, index) => (
						<option key={`option_${opt}_${index}`} value={opt.toLowerCase()}>
							{opt}
						</option>
					))}
				</select>
			</div>
			<Button type='button' variant='transparent'>
				^
			</Button>
			<Button type='button' role='primary' variant='filled'>
				Apply
			</Button>
		</form>
	);
};

export default FilterForm;
