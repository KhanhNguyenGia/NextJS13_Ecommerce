export interface ProductImage {
	src: string;
	alt: string;
}

export interface ProductRating {
	overall: string;
	count: number;
}

export interface ProductComment {
	user: string;
	comment: string;
	rating: string;
	profile: string;
}

export interface IProduct {
	_id: string;
	name: string;
	description: string;
	price: number;
	images: ProductImage[];
	ratings: ProductRating;
	comments: ProductComment[];
}
