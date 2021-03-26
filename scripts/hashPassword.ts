import { passwordHash } from '../src/utils';

const password = process.argv[0].endsWith('ts-node') ? process.argv[2] : process.argv[1];

if (password === undefined) {
    console.log('Password Hashing Script\nUsage: (npm run|yarn) password:hash 1234');
} else {
    console.log('Password Hashing Script\n\tHashed ->', passwordHash(password));
}
