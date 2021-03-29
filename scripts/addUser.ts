import { initialize as dbInit, close as dbClose } from '../src/database/connectionHandler';
import { User, Type } from '../src/database/models';
import { getRepository } from 'typeorm';
import { passwordHash } from '../src/utils';

(async () => {
    await dbInit();
    const repo = getRepository(User);
    const log = console.log.bind(this, '[Database helper - Create User]\n');

    process.argv.find(x => x.endsWith('ts-node')) !== undefined
        ? process.argv.splice(0, 2)
        : process.argv.splice(0, 1);

    const [email, password] = process.argv;
    const usageMessage = log.bind(this, 'Usage: (yarn|npm run) database:new-user email password');

    if (email === undefined) {
        usageMessage();
        await dbClose();
        process.exit(0);
    }

    if (password === undefined) {
        usageMessage();
        await dbClose();
        process.exit(0);
    }

    try {
        const typeRepo = await getRepository(Type);
        const status = true;
        const type = await typeRepo.findOneOrFail({
            where: {
                description: 'Root'
            }
        });

        const user = await repo.insert({
            email, password: passwordHash(password), type, status
        });

        log('User created', user);
    } catch (e) {
        console.error('Failure', e);
    }

    await dbClose();
    process.exit(0); // force quit
})();
