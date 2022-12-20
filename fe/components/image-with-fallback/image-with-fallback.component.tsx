'use client';

import Image, { ImageProps } from 'next/image';
import { FC, useState } from 'react';

export interface IImageWithFallbackProps extends ImageProps {
	fallbackSrc?: string;
}

const ImageWithFallback: FC<IImageWithFallbackProps> = ({
	src,
	fallbackSrc = '',
	alt,
	...rest
}) => {
	const [imageSrc, setImageSrc] = useState(src);
	return <Image {...rest} src={imageSrc} onError={() => setImageSrc(fallbackSrc)} alt={alt} />;
};

export default ImageWithFallback;
