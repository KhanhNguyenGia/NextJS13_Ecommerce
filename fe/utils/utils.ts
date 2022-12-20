export function formatPrice(price: string | number) {
	return Number(price).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}
