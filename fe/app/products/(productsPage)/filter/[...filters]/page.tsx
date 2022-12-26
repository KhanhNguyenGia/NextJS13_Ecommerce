import mongoose, { SortOrder } from 'mongoose';
import { IProduct } from '@interface/product.interface';
import Product from '@model/product.model';
import ProductCard from '@components/product-card/product-card.component';
import Pagination from '@components/pagination/pagination.component';

// index 0: sort by category (name, price, ratings etc.);
// index 1: direction (asc, desc);

const CATEGORY = ['name', 'price', 'ratings'];
const DIRECTION = ['asc', 'desc'];

const getFilterProducts = async (filters: string[]) => {
	console.log(filters.join('/'));

	const category = String(filters[0]) ?? 'name';
	if (!CATEGORY.includes(category)) return null;
	const direction = filters[1] ?? 'asc';
	if (!DIRECTION.includes(direction)) return null;
	const limit = filters[2] ?? '6';
	const page = filters[3] ?? '1';
	const skip = (parseInt(page) - 1) * parseInt(limit);
	const sort = { [category]: direction as SortOrder };
	return new Promise<{ products: IProduct[]; totalPages: number; currentPage: number } | null>(
		(resolve, reject) => {
			mongoose.connect(process.env.MONGODB_URI as string, async () => {
				mongoose.set('strictQuery', false);
				const count = await Product.countDocuments();
				const totalPages = Math.ceil(count / parseInt(limit));
				const result = await Product.find({}).sort(sort).limit(parseInt(limit)).skip(skip);
				if (!result) resolve(null);
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
				resolve({ products, totalPages, currentPage: parseInt(page) });
			});
		}
	);
};

const FilterProductPage = async ({ params: { filters } }: { params: { filters: string[] } }) => {
	const result = await getFilterProducts(filters);
	if (!result) return <div>Something went wrong</div>;
	const { products, totalPages, currentPage } = result;
	return (
		<>
			<div className='flex flex-wrap'>
				{products.length === 0 ? (
					<div className='w-full h-full flex justify-center items-center text-xl font-bold'>
						No products found
					</div>
				) : (
					products.map((product) => (
						<ProductCard
							title={product.name}
							image={product.images}
							key={product._id}
							description={product.description}
							price={product.price}
							id={product._id}
							ratings={product.ratings}
						/>
					))
				)}
			</div>
			<Pagination totalPages={totalPages} currentPage={currentPage} />
		</>
	);
};

export default FilterProductPage;
