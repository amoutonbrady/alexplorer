export const prevent = (handler: (...args: any[]) => any) => (e: Event) => {
	e.preventDefault();
	return void handler(e);
};
