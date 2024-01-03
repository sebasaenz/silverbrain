export const getRandomlySortedArray = (arr: any[]) => [
	...arr.sort(() => 0.5 - Math.random()),
]
