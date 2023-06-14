import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity() // Table in db
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude() // Don't show password in consults
    password: string;

    // Logs from User Databases
    @AfterInsert()
    logInsert() {
        console.log(`Inserted User with id ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated User with id ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed User with id ${this.id}`);
    }
}