import mongoose from 'mongoose';
import Slider from '@components/slider/slider.component';
import ProductCard from '@components/product-card/product-card.component';
import { IProduct } from '@interface/product.interface';
import Product from '@model/product.model';

const IMAGE_ARRAY = Array.from(Array(5)).map((_, i) => ({
	src: `https://picsum.photos/id/${i + 1}/900/600`,
	alt: `Image ${i + 1}`,
}));

const getProducts = async () => {
	return new Promise<IProduct[]>((resolve, reject) => {
		mongoose.connect(process.env.MONGODB_URI as string, async () => {
			mongoose.set('strictQuery', false);
			const result = await Product.find({}).limit(6);
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

const HomePage = async () => {
	const products: IProduct[] = await getProducts();

	return (
		<div className='m-auto py-5 max-w-7xl flex flex-col gap-5'>
			<div className='px-5 flex flex-col gap-5'>
				<Slider images={IMAGE_ARRAY} showNav rounded />
				<h2 className='font-semibold text-2xl'>Title 1</h2>
			</div>
			<div className='flex flex-wrap'>
				{products.map((product) => (
					<ProductCard
						title={product.name}
						image={product.images}
						key={product._id}
						description={product.description}
						id={product._id}
					/>
				))}
			</div>
		</div>
	);
};

export default HomePage;
