import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grid: Array<Array<CharacterData>>;

    @Column()
    profit: number;

    @Column()
    isFinished: boolean;

    @Column()
    words: Array<string>;

    @Column()
    displayedLetters: Array<CharacterData>;
}
