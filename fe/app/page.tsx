import Slider from '../components/slider/slider.component';
import ProductCard from '../components/product-card/product-card.component';

const IMAGE_ARRAY = Array.from(Array(5)).map((_, i) => ({
	src: `https://picsum.photos/id/${i + 1}/900/600`,
	alt: `Image ${i + 1}`,
}));

const PRODUCT_ARRAY = IMAGE_ARRAY.map((image, index) => ({
	id: (index + 1).toString(),
	image,
	title: `Product ${index + 1}`,
	description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti nam optio, soluta sunt`,
}));

const HomePage = () => {
	return (
		<div className='m-auto p-5 max-w-7xl flex flex-col gap-5'>
			<Slider images={IMAGE_ARRAY} showNav />
			<h2 className='font-semibold text-2xl'>Title 1</h2>
			<div className='flex flex-wrap w-full'>
				{PRODUCT_ARRAY.map(({ image, title, id }, index) => (
					<ProductCard
						id={id}
						image={[image]}
						key={`${image}_product_card_${index}`}
						title={title}
					/>
				))}
			</div>
		</div>
	);
};

export default HomePage;
