import { SkeletonProductCard } from '../../../components/product-card/product-card.component';
import Spinner from '../../../components/spinner/spinner.component';

const Loading = () => {
	return (
		<div className='flex flex-wrap'>
			{Array.from(Array(6)).map((_, index) => (
				<SkeletonProductCard key={`skeleton_${index}`} />
			))}
		</div>
	);
};

export default Loading;
