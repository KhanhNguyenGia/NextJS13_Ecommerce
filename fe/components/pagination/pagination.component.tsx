'use client';

import Button from '@components/button/button.component';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export interface IPaginationProps {
	currentPage?: number;
	totalPages?: number;
}

const Pagination: FC<IPaginationProps> = ({ currentPage = 1, totalPages = 1 }) => {
	const router = useRouter();

	const onPageNavigate = (i: number) => {
		const { pathname } = window.location;
		const path = pathname.split('/').slice(1, 6);
		const newPath = [...path, i].join('/');
		router.push(newPath);
	};

	return (
		<div className='flex flex-row gap-3 justify-center items-center'>
			<Button
				type='button'
				role='primary'
				onClick={() => onPageNavigate(currentPage - 1)}
				disabled={currentPage === 1}
			>
				&lt;
			</Button>
			{Array.from({ length: totalPages }, (_, i) => (
				<Button
					type='button'
					role='primary'
					variant={currentPage === i + 1 ? 'filled' : 'outlined'}
					key={`pagination_button_${i}`}
					className='w-10'
					onClick={() => onPageNavigate(i + 1)}
				>
					{i + 1}
				</Button>
			))}
			<Button
				type='button'
				role='primary'
				onClick={() => onPageNavigate(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				&gt;
			</Button>
		</div>
	);
};

export default Pagination;
