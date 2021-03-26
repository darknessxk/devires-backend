import { passwordHash } from '../src/utils';

const password = process.argv[1] || '1234';

console.log(passwordHash(password), ':Hashed <--> Password: ', password);
