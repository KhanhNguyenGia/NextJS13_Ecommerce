import { FC } from 'react';
import BreadCrumbs from '@components/breadcrumbs/breadcrumbs.component';
import FilterForm from './filter-form.component';

export interface IProductLayoutProps {
	children: React.ReactNode;
}

const ProductsLayout: FC<IProductLayoutProps> = ({ children }) => {
	return (
		<div className='max-w-7xl p-5 m-auto flex gap-3 min-h-[calc(100vh_-_56px)]'>
			<aside className='flex-1 h-max sticky top-5 bg-white shadow-lg rounded-lg p-5'>
				<FilterForm />
			</aside>
			<main className='flex-[7] flex flex-col gap-5'>
				<div className='px-5'>
					<BreadCrumbs path={['Products']} />
				</div>
				{children}
			</main>
		</div>
	);
};

export default ProductsLayout;
