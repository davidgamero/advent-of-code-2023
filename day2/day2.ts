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

function gameIsPossible(game: Game, lim: limits): boolean {
	const subsets = game.subsets;
	for (const subset of subsets) {
		console.log('subset:', subset);
		for (const color of subset.keys()){
			console.log('checking color:', color);
			const count = subset.get(color);
			const limit = lim.get(color);
			if (!limit) {
				throw new Error(`No limit for color ${color}`);
			}
			console.log('comparing count:', count, ' to limit:', limit, ' for color:', color);
			if (count === undefined) {
				throw new Error(`No count for color ${color}`);
			}
			if (count > limit) {
				console.log('count > limit');
				return false;
			}
		}
	}
	return true;
}

const l:limits= new Map<Color,number>();
l.set(Color.red,   12);
l.set(Color.green, 13);
l.set(Color.blue,  14);


console.log('possiblegame')
const possibleGameMap: draw = new Map<Color,number>();
possibleGameMap.set(Color.red, 1);
possibleGameMap.set(Color.green, 1);
possibleGameMap.set(Color.blue, 1);
const possibleGame: Game = { id: 1, subsets: [ possibleGameMap ] } ;

const impossibleGameMap: draw = new Map<Color,number>();
impossibleGameMap.set(Color.red, 13);
impossibleGameMap.set(Color.green, 1);
impossibleGameMap.set(Color.blue, 1);
const impossibleGame: Game = { id: 2, subsets: [ impossibleGameMap ] };
console.log(gameIsPossible(possibleGame, l));
console.log(gameIsPossible(impossibleGame, l));

let total = 0;
text.split("\n").forEach((line) => {
	if (!line) {
		return;
	}
	const game = parseGame(line);
	if (gameIsPossible(game, l)){
		total += game.id;
	}
	console.log('total:', total);
});
console.log(total);
