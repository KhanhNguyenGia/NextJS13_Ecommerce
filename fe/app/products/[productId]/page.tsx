import { faker } from '@faker-js/faker';
import dbConnect from '../../../utils/mongodb/mongodb.utils';
import { formatPrice } from '../../../utils/utils';
import Product from '../../../model/product.model';
import Slider from '../../../components/slider/slider.component';
import Quantity from './quantity.component';
import CommentSection from './comment-section.component';
import { IProduct } from '../../../interface/product.interface';
import mongoose from 'mongoose';

export interface IProductPageProps {
	params: {
		productId: string;
	};
}

// export const getProducts = async () => {
// 	await dbConnect();
// 	console.log('Connected to DB');
// 	const result = await Product.find({}).limit(6);
// 	const products = result.map((doc) => {
// 		const product = doc.toObject();
// 		product._id = product._id.toString();
// 		product.images = product.images.map((image: any) => ({ ...image, _id: image._id.toString() }));
// 		product.ratings = { ...product.ratings, _id: product.ratings._id.toString() };
// 		product.comments = product.comments.map((comment: any) => ({
// 			...comment,
// 			_id: comment._id.toString(),
// 		}));
// 		return product;
// 	});
// 	return products;
// };

// // Generate static params for dynamic routes
// export async function generateStaticParams() {
// 	const products: IProduct[] = await getProducts();
// 	return products.map((product) => ({
// 		productId: product._id.toString(),
// 	}));
// }

// export const getProductById = async (productId: string) => {
// 	console.log(productId);

// 	// await dbConnect();
// 	return new Promise<IProduct>((resolve, reject) => {
// 		mongoose.connect(process.env.MONGODB_URI as string, () => {
// 			console.log('Connected to DB');
// 			Product.findById(productId, (err: Error, product: IProduct) => {
// 				if (err) reject(err);
// 				resolve(product);
// 			});
// 		});
// 	});
// };

export const getProductById = async (productId: string) => {
	const product: IProduct = {
		_id: productId,
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(1, 200, 2),
		images: Array.from(Array(3)).map((_, i) => ({
			src: faker.image.imageUrl(900, 450, 'fashion', true),
			alt: faker.commerce.productAdjective(),
		})),
		ratings: {
			overall: faker.commerce.price(0, 5, 2, 'Star '),
			count: Number(faker.random.numeric(3)),
		},
		comments: Array.from(Array(3)).map((_, i) => ({
			user: faker.name.firstName(),
			rating: faker.commerce.price(0, 5, 2, 'Star '),
			profile: faker.image.imageUrl(50, 50, 'people', true),
			comment: faker.lorem.paragraph(),
		})),
	};
	return product;
};

const ProductPage = async ({ params: { productId } }: IProductPageProps) => {
	const product = await getProductById(productId);
	return (
		<div className='flex gap-5 flex-col'>
			<div className='flex gap-5 flex-col md:flex-row'>
				<div className='flex-[6] flex flex-col'>
					<Slider images={product.images} showNav />
				</div>
				{/* Note switch to form in the future, because NextJS 13 is fun */}
				<div className='flex-[2] flex flex-col'>
					<h2 className='text-2xl font-bold'>{product.name}</h2>
					{/* star icon */}
					<div className='flex gap-2 text-sm text-gray-500'>
						<span>{product.ratings.overall} / 5</span>
						<span>({product.ratings.count})</span>
					</div>

					<p className='mt-2 mb-5'>{product.description}</p>
					<h3 className='text-xl font-bold'>{formatPrice(product.price)}</h3>
					<Quantity price={product.price} />
				</div>
			</div>
			<CommentSection comments={product.comments} />
		</div>
		// <div>{productId}</div>
	);
};

export default ProductPage;
