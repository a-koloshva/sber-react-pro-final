export type BaseDates = {
	createdAt: string;
	updatedAt?: string;
};

export type Category = {
	id: number;
	name: string;
	slug: string;
};

export type ProductLike = {
	id: string;
	userId: string;
	productId: string;
};

export type ProductReviewAuthor = {
	id: string;
	name: string;
};

export type BaseProduct = BaseDates & {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string;
	slug: string;
	discount: number;
	isPublished: boolean;
	stock: number;
	tags: string[];
};

export type ReviewProduct = BaseProduct & {
	categoryId: number;
	userId: string;
	wight: string;
};

export type Review = BaseDates & {
	id: string;
	user: ProductReviewAuthor;
	text: string;
	rating: number;
	product: ReviewProduct;
};

export type Product = BaseProduct & {
	reviews: Review[];
	category: Category;
	user: ProductReviewAuthor;
	likes: ProductLike[];
};
