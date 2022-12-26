import mongoose from 'mongoose';
import { IProduct } from '@interface/product.interface';
import ProductCard from '@components/product-card/product-card.component';
import Product from '@model/product.model';

const getProducts = async () => {
	return new Promise<IProduct[]>((resolve, reject) => {
		mongoose.connect(process.env.MONGODB_URI as string, async () => {
			mongoose.set('strictQuery', false);
			const result = await Product.find({});
			const products = result.map((doc) => {
				const product = doc.toObject();
				product._id = product._id.toString();
				product.images = product.images.map((image: any) => ({
					...image,
					_id: image._id.toString(),
				}));
				product.ratings = { ...product.ratings, _id: product.ratings._id.toString() };
				product.comments = product.comments.map((comment: any) => ({
					...comment,
					_id: comment._id.toString(),
				}));
				return product;
			});
			resolve(products);
		});
	});
};

const ProductsPage = async () => {
	const products: IProduct[] = await getProducts();

	return (
		<div className='flex flex-wrap'>
			{products.map((product) => (
				<ProductCard
					title={product.name}
					image={product.images}
					key={product._id}
					description={product.description}
					price={product.price}
					id={product._id}
					ratings={product.ratings}
				/>
			))}
		</div>
	);
};

export default ProductsPage;
