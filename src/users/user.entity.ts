import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Table in db
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}