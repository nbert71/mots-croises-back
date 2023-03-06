import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";

class orient {
    public debut_x: number;
    public debut_y: number;
    public orientation: boolean;
    public number_letters: number
}

class word {
    public mot: string;
    public lettre_reste_a_trouver: string[];
    public mot_valid: boolean;
    public position: orient
}

class letter {
    public value: string;
    public mots_associes: number[]
}

class generated_grid {
    public grid: string[];
    public letters: letter[][];
    public n_x: number;
    public n_y: number
}

class findedWords {
    public words: word[];
    public simpleWords: string[]
}

class mainType {
    public grid: string[];
    public displayedLetters: string[];
    public profit: number;
    public words: string[]
}

@Injectable()
export class GenerateGame {
    async generate_grid(): Promise<generated_grid> {
        let response = await fetch(process.env.API_GENERATOR);
        let grid: string[] = await response.json();
        let n_x: number = grid.length;
        let n_y: number = grid[0].length;
        let letters: letter[][] = Array(n_x);
        for (let i: number = 0; i < n_x; i++) {
            letters[i] = Array(n_y);
            for (let j: number = 0; j < n_y; j++) {
                letters[i][j] = {
                    value: grid[i][j],
                    mots_associes: [-1, -1]//first value vertical & 2nd value horizontal
                }
            }
        }
        return { grid, letters, n_x, n_y }
    }

    extract_letters(word: string): string[] {
        let letters_list: string[] = [];
        for (let char of word) {
            if (!letters_list.includes(char)) {
                letters_list.push(char);
            }
        }
        return letters_list;
    }

    get_all_letters(letters: letter[][], n_x: number, n_y: number): string[] {
        let letters_list: string[] = [];
        for (let i: number = 0; i < n_x; i++) {
            for (let j: number = 0; j < n_y; j++) {
                let current_letter: string = letters[i][j].value;
                if (!letters_list.includes(current_letter) && current_letter !== "-") {
                    letters_list.push(current_letter)
                }
            }
        }
        return letters_list;
    }

    isVowel(char: string): boolean {
        return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(char.toLowerCase()) !== -1
    }

    shuffleArray<Type>(arr: Type[]): Type[] {
        return arr.sort((a, b) => 0.5 - Math.random())
    }

    generate_my_letters(letters: letter[][], n_x: number, n_y: number): string[] {

        let my_letters: string[] = [];// Mon jeu de 14 lettres

        let letters_bag: string[] = this.get_all_letters(letters, n_x, n_y);   // on a toutes les lettres de la grille

        let vowels_bag: string[] = letters_bag.filter(char => this.isVowel(char));  // toutes les voyelles de la grille
        let consouns_bag: string[] = letters_bag.filter(char => !this.isVowel(char));   // idem pour les consonnes

        //On sélectionne max 4 voyelles random, ou moins si la grille en comporte moins
        if (vowels_bag.length < 4) {
            vowels_bag.map(vowel => {
                my_letters.push(vowel);
            })

        } else {
            let shuffled_vowels: string[] = this.shuffleArray(vowels_bag); // on shuffle les voyelles
            let choosen_vowels: string[] = shuffled_vowels.slice(0, 4)    // on prend les 4 premières
            choosen_vowels.map(vowel => {
                my_letters.push(vowel);
            })
        }

        let consouns_number: number = 14 - my_letters.length    // TODO mettre le 14 en paramètre du constructeur
        let shuffled_consouns: string[] = this.shuffleArray(consouns_bag);


        for (let i = 0; i < consouns_number; i++) {
            my_letters.push(shuffled_consouns[i]);
        }

        return this.shuffleArray(my_letters)
    }

    find_words(letters: letter[][], n_x: number, n_y: number): findedWords {
        let words: word[] = []
        let index: number = 0
        for (let x = 0; x < n_x; x++) {
            let current_word: string = "";
            let begin: number = -1;
            for (let y: number = 0; y < n_y; y++) {
                if (letters[x][y].value !== "-") {
                    if (current_word === "") {
                        begin = y
                    }
                    current_word += letters[x][y].value
                } else if (current_word !== "") {
                    let length: number = y - begin
                    if (length !== 1) {
                        let letters_list: string[] = this.extract_letters(current_word)
                        words.push({
                            mot: current_word,
                            lettre_reste_a_trouver: letters_list,
                            mot_valid: false,
                            position: {
                                debut_x: x,
                                debut_y: begin,
                                orientation: false,//true -> vertical & false -> horizontal
                                number_letters: current_word.length
                            }
                        })
                        for (let y_bis: number = begin; y_bis < y; y_bis++) {
                            letters[x][y_bis].mots_associes[0] = index//first value horizontal & 2nd value vertical
                        }
                        index += 1
                    }
                    current_word = ""
                }
            }
            if (current_word !== "") {
                let length: number = n_y - begin
                if (length !== 1) {
                    let letters_list: string[] = this.extract_letters(current_word)
                    words.push({
                        mot: current_word,
                        lettre_reste_a_trouver: letters_list,
                        mot_valid: false,
                        position: {
                            debut_x: x,
                            debut_y: begin,
                            orientation: false,//true -> vertical & false -> horizontal
                            number_letters: current_word.length
                        }
                    })
                    for (let y_bis: number = begin; y_bis < n_y; y_bis++) {
                        letters[x][y_bis].mots_associes[0] = index//first value horizontal & 2nd value vertical
                    }
                    index += 1
                }
            }
        }
        for (let y: number = 0; y < n_y; y++) {
            let current_word: string = "";
            let begin: number = -1;
            for (let x: number = 0; x < n_x; x++) {
                if (letters[x][y].value !== "-") {
                    if (current_word === "") {
                        begin = x
                    }
                    current_word += letters[x][y].value
                } else if (current_word !== "") {
                    let length: number = x - begin
                    if (length !== 1) {
                        let letters_list: string[] = this.extract_letters(current_word)
                        words.push({
                            mot: current_word,
                            lettre_reste_a_trouver: letters_list,
                            mot_valid: false,
                            position: {
                                debut_x: begin,
                                debut_y: y,
                                orientation: true,//true -> vertical & false -> horizontal
                                number_letters: current_word.length
                            }
                        })
                        for (let x_bis: number = begin; x_bis < x; x_bis++) {
                            letters[x_bis][y].mots_associes[1] = index //first value horizontal & 2nd value vertical
                        }
                        index += 1
                    }
                    current_word = ""
                }
            }
            if (current_word !== "") {
                let length: number = n_x - begin
                if (length !== 1) {
                    let letters_list: string[] = this.extract_letters(current_word)
                    words.push({
                        mot: current_word,
                        lettre_reste_a_trouver: letters_list,
                        mot_valid: false,
                        position: {
                            debut_y: y,
                            debut_x: begin,
                            orientation: false,//true -> vertical & false -> horizontal
                            number_letters: current_word.length
                        }
                    })
                    for (let x_bis: number = begin; x_bis < n_x; x_bis++) {
                        letters[x_bis][y].mots_associes[1] = index//first value horizontal & 2nd value vertical
                    }
                    index += 1
                }
            }
        }
        let simpleWords: string[] = []
        words.forEach(complexeWord => {
            simpleWords.push(complexeWord.mot)
        });
        return { words, simpleWords }
    }

    discover_letter(letter: string, words: word[]): number {
        for (let i: number = 0; i < words.length; i++) {
            let index = words[i].lettre_reste_a_trouver.indexOf(letter)
            if (index !== -1) {
                words[i].lettre_reste_a_trouver.splice(index, 1)
                if (words[i].lettre_reste_a_trouver.length === 0) {
                    words[i].mot_valid = true;
                }
            }
        }
        let number: number = 0
        for (let i: number = 0; i < words.length; i++) {
            if (words[i].mot_valid)
                number += 1;
        }
        return number;
    }

    calcProfit(found_word: number): number {
        let profit: number = 0
        if (found_word <= 1) {
            profit = 0
        } else if (found_word === 2) {
            profit = 3
        } else if (found_word === 3) {
            profit = 6
        } else if (found_word === 4) {
            profit = 15
        } else if (found_word === 5) {
            profit = 30
        } else if (found_word === 6) {
            profit = 100
        } else if (found_word === 7) {
            profit = 5000
        } else if (found_word === 8) {
            profit = 10000
        } else {
            profit = 40000
        }
        return profit
    }

    async main(): Promise<mainType> {
        let { grid, letters, n_x, n_y }: generated_grid = await this.generate_grid()
        let myLetters: string[] = this.generate_my_letters(letters, n_x, n_y)
        let { words, simpleWords }: findedWords = this.find_words(letters, n_x, n_y)
        let found_word: number = 0;
        myLetters.forEach(lettre => {
            found_word = this.discover_letter(lettre, words)
        });
        let profit: number = this.calcProfit(found_word)

        return {
            grid: grid,
            displayedLetters: myLetters,
            profit: profit,
            words: simpleWords
        }
    }
}