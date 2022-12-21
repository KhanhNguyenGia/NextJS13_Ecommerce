import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
	name: {
		require: true,
		type: String,
	},
	description: {
		require: true,
		type: String,
	},
	price: {
		require: true,
		type: String,
	},
	images: {
		require: true,
		type: [{ src: String, alt: String }],
	},
	ratings: {
		require: true,
		type: { overall: String, count: Number },
	},
	comments: {
		require: true,
		type: [{ user: String, comment: String, rating: String, profile: String }],
	},
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
