const app = require('express')();
const mongoose = require('mongoose');
const { randomUUID } = require('crypto');
const { faker } = require('@faker-js/faker');
const PORT = 3001;

const ProductSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', ProductSchema);

app.get('/', (req, res) => {
	//send a button with a link to /generate
	res.send(
		`<button><a href="/generate">Generate</a></button><button><a href="/update">Update</a></button>`
	);
});

app.get('/update', async (req, res) => {
	await Product.updateMany(
		{},
		{
			ratings: {
				overall: faker.commerce.price(0, 5, 2),
				count: Number(faker.random.numeric(3)),
			},
		}
	);
	res.redirect('/');
});

app.get('/generate', (req, res) => {
	console.log('get');
	// loop 20 times
	for (let i = 0; i < 20; i++) {
		const product = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(1, 200, 2),
			images: Array.from(Array(3)).map((_, i) => ({
				src: faker.image.imageUrl(900, 450, 'fashion', true),
				alt: faker.commerce.productAdjective(),
			})),
			ratings: {
				overall: faker.commerce.price(0, 5, 2),
				count: Number(faker.random.numeric(3)),
			},
			comments: Array.from(Array(3)).map((_, i) => ({
				user: faker.name.firstName(),
				rating: faker.commerce.price(0, 5, 2),
				profile: faker.image.imageUrl(50, 50, 'people', true),
				comment: faker.lorem.paragraph(),
			})),
		};
		Product.create(product);
	}

	return res.redirect('/');
});

app.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) {
			console.log(err);
			return res.status(500).json();
		}
		if (!product) {
			return res.status(404).json();
		}
		return res.status(200).json(product);
	});
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
	mongoose.connect(
		'mongodb+srv://nextjs13:vbYcJx1EEMb4fPB2@cluster0.zhqtkct.mongodb.net/?retryWrites=true&w=majority'
	);
	console.log('Connected to MongoDB');
});
