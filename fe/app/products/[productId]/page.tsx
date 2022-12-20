import { IProductExtended } from '../../../pages/api/products/[productId]';
import { formatPrice } from '../../../utils/utils';
import Slider from '../../../components/slider/slider.component';
import Quantity from './quantity.component';
import CommentSection from './comment-section.component';
import { faker } from '@faker-js/faker';

export interface IProductPageProps {
	params: {
		productId: string;
	};
}

export async function getProduct(productId: string) {
	// const res = await fetch(`http://localhost:3000/api/products/${productId}`);
	// return await res.json();
	const product: IProductExtended = {
		id: productId,
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
}

const ProductPage = async ({ params: { productId } }: IProductPageProps) => {
	const product: IProductExtended = await getProduct(productId);

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
	);
};

export default ProductPage;
