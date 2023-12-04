use std::env;
use std::ffi::c_char;
use std::fs;
use std::ops::Index;

fn keep_digits(s: &str) -> String {
    let char_vec: Vec<char> = s.chars().collect();
    let just_numbers: Vec<char> = char_vec.into_iter().filter(|c| c.is_numeric()).collect();
    let numbers: String = just_numbers.into_iter().collect();
    numbers
}

fn get_first_and_last(s: &String) -> String {
    let char_vec: Vec<char> = s.chars().collect();
    let first_and_last: Vec<char> = vec![char_vec[0], char_vec[char_vec.len() - 1]];
    let numbers: String = first_and_last.into_iter().collect();
    numbers
}

const digits_to_words: [&str; 9] = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

fn main() {
    let file_path = "./input1.txt";

    let mut contents =
        fs::read_to_string(file_path).expect("Should have been able to read the file");

    for (i, word) in digits_to_words.iter().enumerate() {
        contents = contents.replace(word, &i.to_string());
    }

    println!(
        "The contents of the file with numbers replaced: {}",
        contents,
    );

    let lines = contents.lines();
    for mut line in lines {
        let i = 0;
        let mut digits: Vec<char> = [].to_vec();

        for mut i_char in 0..line.chars().count() {
            let c_char = line.chars().nth(i).unwrap();
            if c_char.is_numeric() {
                digits.append(&mut vec![c_char]);
                continue;
            }
            let i_start = i;

            // test against every word in digits_to_words
            for i_word in 0..digits_to_words.len() {
                let word = digits_to_words.index(i_word);
                let line_content = &line[i_start..word.len()];
                println!("line_content: {}", line_content);
                println!("word: {}", word);
                if line_content.eq(&word) {
                    digits_to_words.index(index)
                    digits.append(&mut vec![c_char]);
                }
            }
        }
    }
    let just_numbers: Vec<String> = lines.map(keep_digits).rev().collect();
    let first_and_last: Vec<String> = just_numbers.iter().map(get_first_and_last).collect();

    let sum: u32 = first_and_last
        .iter()
        .map(|s| s.parse::<u32>().unwrap())
        .sum();

    println!("The sum is {}", sum);
}
