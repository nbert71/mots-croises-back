import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grid: string;

    @Column()
    profit: number;

    @Column()
    isFinished: boolean;

    @Column()
    words: string;

    @Column()
    displayedLetters: string;
}