import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Table in db
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}