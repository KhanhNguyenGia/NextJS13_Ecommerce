import { FC } from 'react';
import BreadCrumbs from '../../../components/breadcrumbs/breadcrumbs.component';

export interface IProductLayoutProps {
	children: React.ReactNode;
}

const ProductsLayout: FC<IProductLayoutProps> = ({ children }) => {
	return (
		<div className='max-w-7xl p-5 m-auto flex gap-3'>
			<aside className='flex-1'>
				<form>Aside</form>
			</aside>
			<main className='flex-[7] flex flex-col gap-5'>
				<BreadCrumbs path={['Products']} />
				{children}
			</main>
		</div>
	);
};

export default ProductsLayout;
