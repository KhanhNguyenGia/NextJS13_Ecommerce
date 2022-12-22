import mongoose from 'mongoose';
import { formatPrice } from '../../../utils/utils';
import Product from '../../../model/product.model';
import Slider from '../../../components/slider/slider.component';
import Quantity from './quantity.component';
import CommentSection from './comment-section.component';
import { IProduct } from '../../../interface/product.interface';
import { StarIconFilled, StarIconOutlined } from '../../../assets/icon';

export interface IProductPageProps {
	params: {
		productId: string;
	};
}

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

const getProductById = async (productId: string) => {
	return new Promise<IProduct>((resolve, reject) => {
		mongoose.connect(process.env.MONGODB_URI as string, async () => {
			mongoose.set('strictQuery', false);
			const result = await Product.findById(productId);
			const product = result.toObject();
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
			resolve(product);
		});
	});
};

// equivalent of generateStaticPaths
// export const dynamicParams = true; is the default, allowing pages to be generate on demand
// export const dynamicParams = false; will throw 404 for pages that are not generated
export async function generateStaticParams() {
	const products = await getProducts();

	return products.map((product) => ({
		productId: product._id,
	}));
}

const ProductPage = async ({ params: { productId } }: IProductPageProps) => {
	const product = await getProductById(productId);
	return (
		<div className='flex gap-5 flex-col'>
			<div className='flex gap-5 flex-col md:flex-row px-5'>
				<div className='flex-[6] flex flex-col'>
					<Slider images={product.images} showNav height='h-full' />
				</div>
				{/* Note switch to form in the future, because NextJS 13 is fun */}
				<div className='flex-[2] flex flex-col bg-white rounded-lg shadow-md p-5'>
					<h2 className='text-2xl font-bold'>{product.name}</h2>
					{/* star icon */}
					<div className='flex gap-2 text-sm text-gray-500'>
						<div className='flex gap-2 text-yellow-500 items-center'>
							{Array.from(Array(5)).map((_, i) =>
								i <= Math.round(Number(product.ratings.overall)) ? (
									<StarIconFilled key={`stars_${i}`} sizes='w-7 h-7' />
								) : (
									<StarIconOutlined key={`stars_${i}`} sizes='w-7 h-7' />
								)
							)}{' '}
							<div className='text-gray-500 flex items-center'>({product.ratings.count})</div>
						</div>
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
