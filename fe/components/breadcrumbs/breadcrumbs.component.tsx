import Link from 'next/link';
import { FC } from 'react';

export interface IBreadCrumbsProps {
	path: string[];
}

const BreadCrumbs: FC<IBreadCrumbsProps> = ({ path }) => {
	return (
		<div className='flex'>
			{path.map((crumb, index) => {
				const pathname = path
					.slice(0, index + 1)
					.join('/')
					.toLowerCase();
				return (
					<span key={`crumb_${crumb}_${index}`}>
						<span className='mx-2'>/</span>
						<Link href={`/${pathname}`} className='text-gray-500 underline underline-offset-2'>
							{crumb}
						</Link>
					</span>
				);
			})}
		</div>
	);
};

export default BreadCrumbs;
