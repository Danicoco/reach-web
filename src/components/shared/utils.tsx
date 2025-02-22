
export const formatCurrency = (amount: number, currency: string) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	});

	return formatter.format(amount);
};