import { MigrationInterface, QueryRunner } from 'typeorm';
import { Type } from '../models';

export class addUserTypes1616798826515 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(Type, {
            description: 'Root'
        });
        await queryRunner.manager.insert(Type, {
            description: 'Admin'
        });
        await queryRunner.manager.insert(Type, {
            description: 'Default'
        });
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        const types = await queryRunner.manager.find(Type, {
            where: {
                description: ['Root', 'Admin', 'Default']
            }
        });

        await queryRunner.manager.remove(types);
    }
}
