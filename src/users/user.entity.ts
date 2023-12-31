import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    OneToMany
} from 'typeorm';

import { Report } from '../reports/report.entity';

@Entity() // Table in db
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    admin: boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

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