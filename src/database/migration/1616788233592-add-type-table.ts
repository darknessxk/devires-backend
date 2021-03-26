import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class addTypeTable1616788233592 implements MigrationInterface {
    tableName: string = 'type';

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    default: 'UUID()'
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createIndex(this.tableName, new TableIndex({
            name: 'IDX_TYPE_ID',
            columnNames: ['id']
        }));
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName, true, true, true);
    }
}
