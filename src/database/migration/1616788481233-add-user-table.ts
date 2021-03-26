import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class addUserTable1616788481233 implements MigrationInterface {
    tableName: string = 'user';

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
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'bool',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'typeId',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createIndex(this.tableName, new TableIndex({
            name: 'IDX_TYPE_ID',
            columnNames: ['id']
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            columnNames: ['typeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'type',
            onDelete: 'CASCADE'
        }));
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
