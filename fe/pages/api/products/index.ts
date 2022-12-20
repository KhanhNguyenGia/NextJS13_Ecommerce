import { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: string;
	images: { src: string; alt: string }[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

	return res.status(200).json(products);
}
