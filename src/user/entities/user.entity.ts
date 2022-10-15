import { Game } from "src/game/entities/game.entity";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: 0})
    money: number;

    @OneToMany(() => Game, game => game.player)
    games: Game[];
}