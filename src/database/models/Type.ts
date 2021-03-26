import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Type {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    description!: string;
}
