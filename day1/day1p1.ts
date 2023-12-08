const inputFilePath = "./input1.txt";
const file = Bun.file(inputFilePath);
const text = await file.text();

const lines = text.split("\n");

function justNumbers(str: string): string[] {
  return str.split("").filter((c) => !isNaN(parseInt(c)));
}

const firstAndLast = lines.map((line) => {
	const numbers = justNumbers(line);
	const first = (numbers[0]);
	const last = (numbers[numbers.length - 1]);
	return first+last;
});
const noNan = firstAndLast.filter((n) => !isNaN(parseInt(n)));
console.log(noNan);

const sum = noNan.reduce((acc, curr) => acc + parseInt(curr), 0);
console.log(sum);
