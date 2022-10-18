import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";

@Injectable()
export class GenerateGame {
    generate_grid(){
        let grid = [
            "--CHIC--NEZ",
            "---O-APRE--",
            "--CUIR--T-E",
            "M--X-ARC--M",
            "A-M--T-A--E",
            "T-E--SAPHIR",
            "IODES--I--A",
            "N-I--U-TENU",
            "E-AGENDA--D",
            "E----I-L--E",
            "SOUDE------",
        ]
        let n_x=grid.length;
        let n_y=grid[0].length;
        let letters=Array(n_x);
        for(let i=0;i<n_x;i++){
            letters[i]=Array(n_y);
            for(let j=0;j<n_y;j++){
                letters[i][j]={
                    value:grid[i][j],
                    mots_associes:[-1,-1]//first value vertical & 2nd value horizontal
                }
            }
        }
        return {grid,letters,n_x,n_y}
    }

    extract_letters(word){
        let letters_list=[];
        for(let char of word){
            if (!letters_list.includes(char)){
                letters_list.push(char);
            }
        }
        return letters_list;
    }

    get_all_letters(letters,n_x,n_y){
        let letters_list = [];
        for (let i = 0; i < n_x; i++) {
            for (let j = 0; j < n_y; j++) {
                let current_letter = letters[i][j].value;
                if(!letters_list.includes(current_letter) && current_letter !== "-"){
                    letters_list.push(current_letter)
                }
            }
        }
        return letters_list;
    }

    isVowel(char){
        return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(char.toLowerCase()) !== -1
    }

    shuffleArray(arr) {
        return arr.sort((a, b) => 0.5 - Math.random())
    }

    generate_my_letters(letters,n_x,n_y){
        
        let my_letters = {
            list: [],
            displayed: {}
        };    // Mon jeu de 14 lettres

        let letters_bag = this.get_all_letters(letters,n_x,n_y);   // on a toutes les lettres de la grille
        
        let vowels_bag = letters_bag.filter(char => this.isVowel(char));  // toutes les voyellzs de la grille
        let consouns_bag = letters_bag.filter(char => !this.isVowel(char));   // idem pour les consonnes

        //On sélectionne max 4 voyelles random, ou moins si la grille en comporte moins
        if(vowels_bag.length < 4) {
            vowels_bag.map(vowel => {
                my_letters.list.push(vowel);
                my_letters.displayed[vowel] = false
            })
                
        } else {
            let shuffled_vowels = this.shuffleArray(vowels_bag); // on shuffle les voyelles
            let choosen_vowels = shuffled_vowels.slice(0, 4)    // on prend les 4 premières
            choosen_vowels.map(vowel => {
                my_letters.list.push(vowel);
                my_letters.displayed[vowel] = false
            })
        }

        let consouns_number = 14 - my_letters.list.length    // TODO mettre le 14 en paramètre du constructeur
        let shuffled_consouns = this.shuffleArray(consouns_bag);
        

        for (let i = 0; i < consouns_number; i++) {
            my_letters.list.push(shuffled_consouns[i]);
            my_letters.displayed[shuffled_consouns[i]] = false
        }
        
        // on mé lange les lettres on sait jamais        
        let shuffled_letters = this.shuffleArray(my_letters.list)
        my_letters.list = shuffled_letters
        return my_letters.list
    }

    find_words(letters,n_x,n_y){
        let words=[]
        let index=0
        for(let x=0;x<n_x;x++){
            let current_word="";
            let begin=-1;
            for(let y=0;y<n_y;y++){
                if(letters[x][y].value!=="-"){
                    if(current_word===""){
                        begin=y
                    }
                    current_word+=letters[x][y].value
                }else if(current_word!==""){
                    let length=y-begin
                    if(length!==1){
                        let letters_list= this.extract_letters(current_word)
                        words.push({
                            mot:current_word,
                            lettre_reste_a_trouver:letters_list,
                            mot_valid:false,
                            position:{
                                debut_x:x,
                                debut_y:begin,
                                orientation:false,//true -> vertical & false -> horizontal
                                number_letters:current_word.length
                            }
                        })
                        for(let y_bis=begin;y_bis<y;y_bis++){
                            letters[x][y_bis].mots_associes[0]=index//first value horizontal & 2nd value vertical
                        }
                        index+=1
                    }
                    current_word=""
                }
            }
            if(current_word!==""){
                let length=n_y-begin
                if(length!==1){
                    let letters_list= this.extract_letters(current_word)
                    words.push({
                        mot:current_word,
                        lettre_reste_a_trouver:letters_list,
                        mot_valid:false,
                        position:{
                            debut_x:x,
                            debut_y:begin,
                            orientation:false,//true -> vertical & false -> horizontal
                            number_letters:current_word.length
                        }
                    })
                    for(let y_bis=begin;y_bis<n_y;y_bis++){
                        letters[x][y_bis].mots_associes[0]=index//first value horizontal & 2nd value vertical
                    }
                    index+=1
                }
            }
        }
        for(let y=0;y<n_y;y++){
            let current_word="";
            let begin=-1;
            for(let x=0;x<n_x;x++){
                if(letters[x][y].value!=="-"){
                    if(current_word===""){
                        begin=x
                    }
                    current_word+=letters[x][y].value
                }else if(current_word!==""){
                    let length=x-begin
                    if(length!==1){
                        let letters_list= this.extract_letters(current_word)
                        words.push({
                            mot:current_word,
                            lettre_reste_a_trouver:letters_list,
                            mot_valid:false,
                            position:{
                                debut_x:begin,
                                debut_y:y,
                                orientation:true,//true -> vertical & false -> horizontal
                                number_letters:current_word.length
                            }
                        })
                        for(let x_bis=begin;x_bis<x;x_bis++){
                            letters[x_bis][y].mots_associes[1]=index //first value horizontal & 2nd value vertical
                        }
                        index+=1
                    }
                    current_word=""
                }
            }
            if(current_word!==""){
                let length=n_x-begin
                if(length!==1){
                    let letters_list= this.extract_letters(current_word)
                    words.push({
                        mot:current_word,
                        lettre_reste_a_trouver:letters_list,
                        mot_valid:false,
                        position:{
                            debut_y:y,
                            debut_x:begin,
                            orientation:false,//true -> vertical & false -> horizontal
                            number_letters:current_word.length
                        }
                    })
                    for(let x_bis=begin;x_bis<n_x;x_bis++){
                        letters[x_bis][y].mots_associes[1]=index//first value horizontal & 2nd value vertical
                    }
                    index+=1
                }
            }
        }
        let simpleWords=[]
        words.forEach(complexeWord => {
            simpleWords.push(complexeWord.mot)
        });
        return {words,simpleWords}
    }

    discover_letter(letter,words){
        for(let i=0;i<words.length;i++){
            let index=words[i].lettre_reste_a_trouver.indexOf(letter)
            if (index!==-1){
                words[i].lettre_reste_a_trouver.splice(index,1)
                if (words[i].lettre_reste_a_trouver.length===0){
                    words[i].mot_valid=true;
                }
            }
        }
        let number=0
        for (let i=0;i<words.length;i++){
            if(words[i].mot_valid)
            number+=1;
        }
        return number;
    }

    calcProfit(finded_words){
        let profit = 0
        if(finded_words<=1){
            profit=0
        }else if(finded_words===2){
            profit=3
        }else if(finded_words===3){
            profit=6
        }else if(finded_words===4){
            profit=15
        }else if(finded_words===5){
            profit=30
        }else if(finded_words===6){
            profit=100
        }else if(finded_words===7){
            profit=5000
        }else if(finded_words===8){
            profit=10000
        }else{
            profit=40000
        }
        return profit
    }

    main(){
        let {grid,letters,n_x,n_y} = this.generate_grid()
        let myLetters = this.generate_my_letters(letters,n_x,n_y)
        let {words,simpleWords} = this.find_words(letters,n_x,n_y)
        let finded_words=0;
        myLetters.forEach(lettre => {
            finded_words = this.discover_letter(lettre,words)
        });
        let profit = this.calcProfit(finded_words)

        return {
            grid: grid,
            displayedLetters : myLetters,
            profit: profit,
            words: simpleWords
        }
    }
}