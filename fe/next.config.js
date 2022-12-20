/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['picsum.photos', 'loremflickr.com'],
	},
};

module.exports = nextConfig;
