const inputFilePath2 = "./input1.txt";
const file2 = Bun.file(inputFilePath2);
const text2 = await file2.text();

const lines2 = text2.split("\n");

const word2num = {
	"one": "1",
	"two": "2",
	"three": "3",
	"four": "4",
	"five": "5",
	"six": "6",
	"seven":"7",
	"eight":"8",
	"nine":"9",
}

class TrieNode {
	children: Map<string, TrieNode> = new Map();
	value: string = "";
	key: string = "";
	constructor(key: string) {
		this.key = key;
	}
}

class Trie {
	root: TrieNode = new TrieNode("");
	insert(word: string,value:string) {
		let c = this.root;
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			if (!c.children.has(char)) {
				c.children.set(char, new TrieNode(char));
			}
			c = c.children.get(char)!;
		}
		c.value = value;
	}
	// returns [value, word]
	search(word: string): [string, string]{
		let c = this.root;
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			if (!c.children.has(char)) {
				return ["", word.substring(0, i+1)];
			}
			c = c.children.get(char)!;
			if (c.value) {
			return [c.value, word.substring(0, i+1)];
			}
		}
		return ["", ""];
	}
}

const trie = new Trie();
for (const [word, num] of Object.entries(word2num)) {
	trie.insert(word, num);
}

function getCalibrationSum(lines: string[]): number {
	const values = lines.map((line) => {
		let first = 0;
		for (let i = 0; i < line.length; i++) {
			const substr = line.substring(i);
			// first check if it's a number
			const char = substr[0];
		if (!isNaN(parseInt(char))) {
			first = parseInt(char);
			break;
		}
		// then check if it's a word
		const [value, word] = trie.search(substr);
	if (value) {
		first = parseInt(value);
		break;
	}
		}
		let last = 0;
		for (let i = line.length; i >= 0; i--) {
			const substr = line.substring(i);
			// first check if it's a number
			const char = substr[0];
		if (!isNaN(parseInt(char))) {
			last = parseInt(char);
			break;
		}
		// then check if it's a word
		const [value, word] = trie.search(substr);
	if (value) {
		last = parseInt(value);
		break;
	}
		}
		let val = (10*first) + last;
		console.log('line is', line, 'first is', first, 'last is', last, 'val is', val);
		return val; 
	});
	console.log(values);
	const sum = values.reduce((acc, curr) => acc + parseInt(curr), 0);
	return sum;
}

const testlines = [
	"two1nine",
	"eightwothree",
	"abcone2threexyz",
	"xtwone3four",
	"4nineeightseven2",
	"zoneight234",
	"7pqrstsixteen",
];
const testsum = getCalibrationSum(testlines);

const inputsum = getCalibrationSum(lines2);
console.log('inputsum=', inputsum);

//console.log(getCalibrationSum(["twone"]));

