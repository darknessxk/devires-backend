import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Type } from './Type';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 128, unique: true, nullable: false })
    email!: string;

    @Column({ type: 'varchar', length: 128, nullable: false, unique: false })
    password!: string;

    @ManyToOne(() => Type, { nullable: false })
    @JoinColumn()
    type!: Type;

    @Column()
    status!: boolean;
}
