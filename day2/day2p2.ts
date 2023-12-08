const inputFilePath = "./input.txt";
const file = Bun.file(inputFilePath);
const text = await file.text();

enum Color {
	red = "red",
	green = "green",
	blue = "blue",
}
type limits = Map<Color,number>;
type draw = Map<Color,number>;
type Game = {
	id: number;
	subsets: draw[];
}

function parseGame(line: string): Game {
	const [gamePart, rest] = line.split(":");
	const id = gamePart.split(" ")[1];
	const draws = rest.split(";").map((subsetstring) => {
		const colorCounts = subsetstring.split(",");
		const d: draw = new Map(); 
		colorCounts.forEach((colorCount) => {
			const [ ,count,colorString] = colorCount.split(" ");
			const color = colorString.trim() as Color;
			console.log("count:",count," color:", color);
			if (isNaN(parseInt(count))) {
				throw new Error(`count is NaN: ${count}`);
			}
			d.set(color, parseInt(count));
		});
		return d;
	});
	return {
		id: parseInt(id),
		subsets: draws,
	};
}

const testGame = "Game 1: 9 red, 2 green, 13 blue; 10 blue, 2 green, 13 red; 8 blue, 3 red, 6 green; 5 green, 2 red, 1 blue";
const parsedGame = parseGame(testGame);
console.log(parsedGame);

function getMinCubes(game: Game): limits{
	let minCubes = new Map<Color,number>();
	minCubes.set(Color.red, 0);
	minCubes.set(Color.green, 0);
	minCubes.set(Color.blue, 0);
	const subsets = game.subsets;
	for (const subset of subsets) {
		console.log('subset:', subset);
		console.log('minCubes:', minCubes);
		for (const color of subset.keys()){
			console.log('checking color:', color);
			const min = minCubes.get(color);
			const count = subset.get(color);
			if (min === undefined) {
				throw new Error(`No min for color ${color}`);
			}
			if (count === undefined) {
				throw new Error(`No count for color ${color}`);
			}
			if (count > min) {
				console.log('count > min');
				minCubes.set(color, count);
			}
		}
	}
	return minCubes;
}

let total = 0;
text.split("\n").forEach((line) => {
	if (!line) {
		return;
	}
	const game = parseGame(line);
	let minCubes = getMinCubes(game);
	let power = minCubes.get(Color.red)! * minCubes.get(Color.green)! * minCubes.get(Color.blue)!; 	
	total += power;
	console.log('total:', total);

});
console.log(total);
