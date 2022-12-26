import { FC } from 'react';
import BreadCrumbs from '@components/breadcrumbs/breadcrumbs.component';

export interface IProductLayoutProps {
	children: React.ReactNode;
	params: {
		productId: string;
	};
}

const ProductLayout: FC<IProductLayoutProps> = ({ children, params: { productId } }) => {
	return (
		<div className='flex flex-col max-w-7xl py-5 m-auto gap-3'>
			<div className='px-5'>
				<BreadCrumbs path={['Products', productId]} />
			</div>
			{children}
		</div>
	);
};

export default ProductLayout;
