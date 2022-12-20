'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import ImageWithFallback from '../image-with-fallback/image-with-fallback.component';

export interface ISliderProps {
	images: {
		src: string;
		alt: string;
	}[];
	showNav?: boolean;
	height?: string;
	animateOnHover?: boolean;
}

const Slider: FC<ISliderProps> = ({
	images,
	showNav = false,
	height = 'h-[50vmin]',
	animateOnHover = false,
}) => {
	const [current, setCurrent] = useState(0);

	const onNext = () => {
		setCurrent((prev) => (prev + 1 < images.length ? prev + 1 : 0));
	};

	const onBack = () => {
		setCurrent((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
	};

	return (
		<div className={`relative w-full ${height} overflow-hidden rounded-lg group`}>
			{images.length > 1 && (
				<div
					className='absolute top-1/2 -translate-y-1/2 left-3 z-10 border-[12px] border-transparent border-r-white/80 cursor-pointer hover:border-r-white'
					onClick={onBack}
				></div>
			)}
			{images.map((image, index) => (
				<div
					className={`${
						current === index
							? 'translate-x-0'
							: current < index
							? 'translate-x-full'
							: '-translate-x-full'
					} absolute w-full h-full transition-all duration-500 ease-in-out text-2xl font-bold flex justify-center items-center text-white`}
					key={`${image}_slide_${index}`}
				>
					<Image
						src={image.src}
						alt={image.alt}
						fill
						sizes='(max-width: 768px) 100vw, 50vw'
						priority={index === 0}
						className={`object-cover object-center ${
							animateOnHover &&
							current === index &&
							'group-hover:scale-110 transition-transform duration-[5s]'
						}`}
					/>
				</div>
			))}
			{images.length > 1 && (
				<div
					className='absolute top-1/2 -translate-y-1/2 right-3 z-10 border-[12px] border-transparent border-l-white/80 cursor-pointer hover:border-l-white'
					onClick={onNext}
				></div>
			)}
			{showNav && (
				<div className='z-10 absolute flex gap-3 bottom-3 left-1/2 -translate-x-1/2'>
					{images.map((image, index) => (
						<button
							key={`${image}_slide_nav_${index}`}
							className={`w-6 h-2 ${
								current === index ? 'bg-white/80' : 'bg-gray-600/50'
							} rounded-full transition-all duration-500 ease-in-out shadow-xl hover:bg-white`}
							onClick={() => setCurrent(index)}
						></button>
					))}
				</div>
			)}
		</div>
	);
};

export default Slider;
