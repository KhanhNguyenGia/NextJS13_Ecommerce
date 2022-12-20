import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '.';

export interface IComment {
	user: string;
	rating: string;
	profile: string;
	comment: string;
}

export interface IProductExtended extends IProduct {
	ratings: { overall: string; count: number };
	comments: IComment[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { productId } = req.query;
	const products: IProductExtended = {
		id: productId as string,
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
	return res.status(200).json(products);
}
