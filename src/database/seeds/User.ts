import { Factory, Seeder } from 'typeorm-seeding';
import faker from 'faker';
import { Connection } from 'typeorm';
import { User } from '../models/User';
import { Type } from '../models/Type';

export default class CreateUser implements Seeder {
    public async run (factory: Factory, connection: Connection): Promise<any> {
        const fact = factory(User)();

        const repo = connection.getRepository(Type);
        const count = await repo.count({ where: { description: ['Root', 'Admin', 'Default'] } });

        if (count === 0) {
            await repo.insert({ description: 'Root' });
            await repo.insert({ description: 'Admin' });
            await repo.insert({ description: 'Default' });
        }

        const type = await repo.findOne({
            where: ['Root', 'Admin', 'Default'][faker.random.number(2)]
        });

        await fact.createMany(10, {
            type
        });
    }
}
