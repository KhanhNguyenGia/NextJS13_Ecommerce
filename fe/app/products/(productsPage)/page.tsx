import ProductCard from '../../../components/product-card/product-card.component';
import { IProduct } from '../../../pages/api/products';

const getProducts = async () => {
	const res = await fetch('http://localhost:3000/api/products');
	return await res.json();
};

const ProductsPage = async () => {
	const products: IProduct[] = await getProducts();

	return (
		<div className='flex flex-wrap'>
			{products.map((product) => (
				<ProductCard
					title={product.name}
					image={product.images}
					key={product.id}
					description={product.description}
					price={product.price}
					id={product.id}
				/>
			))}
		</div>
	);
};

export default ProductsPage;
