import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Type } from './Type';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToOne(() => Type)
    @JoinColumn()
    type!: Type;

    @Column()
    status!: boolean;
}
