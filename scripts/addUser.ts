import getConnection from '../src/database/connectionHandler';
import { User } from '../src/database/models';
import { Type } from '../src/database/models';

(async () => {
    const conn = await getConnection();
    const repo = conn.getRepository(User);
    const log = console.log.bind(this, '[Database helper - Create User]\n');

    process.argv.find(x => x.endsWith('ts-node')) !== undefined
        ? process.argv.splice(0, 2)
        : process.argv.splice(0, 1);

    const [email, password] = process.argv;
    const usageMessage = log.bind(this, 'Usage: (yarn|npm run) database:new-user email password');

    if (email === undefined) {
        usageMessage();
        process.exit(0);
    }

    if (password === undefined) {
        usageMessage();
        process.exit(0);
    }

    try {
        const typeRepo = await conn.getRepository(Type);
        const status = true;
        const type = await typeRepo.findOneOrFail({
            where: {
                description: 'Root'
            }
        });

        const user = await repo.insert({
            email, password, type, status
        });

        console.log('User created', user);
    } catch (e) {
        console.error('Failure', e);
    }
    process.exit(0); // force quit
})();
