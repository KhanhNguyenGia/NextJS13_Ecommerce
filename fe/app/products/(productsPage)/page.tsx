import { randomUUID } from 'crypto';
import ProductCard from '../../../components/product-card/product-card.component';
import { IProduct } from '../../../pages/api/products';
import { faker } from '@faker-js/faker';

const getProducts = async () => {
	// const res = await fetch('/api/products');
	// return await res.json();
	const products: IProduct[] = Array.from(Array(6)).map((_, i) => ({
		id: randomUUID(),
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(1, 200, 2),
		images: Array.from(Array(3)).map((_, i) => ({
			src: faker.image.imageUrl(300, 300, 'fashion', true),
			alt: faker.commerce.productAdjective(),
		})),
	}));
	return products;
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
