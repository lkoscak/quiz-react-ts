export const shuffleArray = (array: any[]): any[] =>
	[...array].sort(() => Math.random() - 0.5);
