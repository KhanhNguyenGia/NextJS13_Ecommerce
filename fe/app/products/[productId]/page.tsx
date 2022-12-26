import mongoose from 'mongoose';
import Link from 'next/link';
import { formatPrice } from '@utils/utils';
import Product from '@model/product.model';
import Slider, { SkeletonSlider } from '@components/slider/slider.component';
import Quantity from './quantity.component';
import CommentSection from './comment-section.component';
import { IProduct } from '@interface/product.interface';
import { StarIconFilled, StarIconOutlined } from '@assets/icon';
import Button from '@components/button/button.component';

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

const ERROR_MESSAGE = {
	'product-not-found': {
		code: 404,
		message: 'Product not found',
	},
	'invalid-product-id': {
		code: 400,
		message: 'Invalid product id',
	},
};

const getProductById = async (productId: string) => {
	return new Promise<IProduct | Error>((resolve, reject) => {
		mongoose.connect(process.env.MONGODB_URI as string, async () => {
			mongoose.set('strictQuery', false);
			try {
				const result = await Product.findById(productId);
				if (!result) resolve(Error(`product-not-found: ${productId}`));
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
			} catch (error) {
				console.log(error);
				resolve(Error(`invalid-product-id: ${productId}`));
			}
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
	if (product instanceof Error) {
		const [code, ...message] = product.message.split(':') as [
			'invalid-product-id' | 'product-not-found',
			string
		];
		return (
			<div className='w-screen fixed z-10 h-[calc(100%_-_56px)] top-14 max-w-7xl flex justify-center items-center flex-col gap-5 bg-[#fafafa]'>
				<h2 className='text-2xl font-bold text-red-500'>Error {ERROR_MESSAGE[code].code}</h2>
				<h3 className='text-lg text-gray-500'>
					{ERROR_MESSAGE[code].message}: {message}
				</h3>
				<Link href='/products'>
					<Button type='button' role='primary'>
						Return to products page
					</Button>
				</Link>
			</div>
		);
	}
	return (
		<div className='flex gap-5 flex-col'>
			<div className='flex gap-5 flex-col md:flex-row px-5'>
				<div className='flex-[6] flex flex-col'>
					<Slider images={product.images} showNav height='h-[50vmin] md:h-full' rounded />
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
	);
};

export default ProductPage;
