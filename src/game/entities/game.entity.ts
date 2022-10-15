import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Timestamp;

    // liste de strings représentants les lignes de la grille "---EAU-B"
    @Column('simple-array')
    grid: string[];

    // gain effecif de la grille avec les lettres en question
    @Column()
    profit: number;

    @Column()
    isFinished: boolean;

    // liste des mots contenus dans la grille
    @Column('simple-array')
    words: string[];

    // les 14 lettres (cliquables) de notre jeu
    @Column('simple-array')
    displayedLetters: string[];

    @ManyToOne(() => User, (user) => user.games)
    player: User;
}