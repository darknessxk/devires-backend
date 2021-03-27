import { passwordHash } from '../passwordHash';
import faker from 'faker';
import { randomNumber } from '../randomNumber';

export const generateUser = () => {
    const password = passwordHash('1234');
    const gender = randomNumber(1);

    const mailData = faker.internet.email(faker.name.firstName(gender), faker.name.lastName(gender)).split('@');
    const email = `${passwordHash(`${Date.now()}-${mailData[0]}`).substr(0, 16)}@${mailData[1]}`;
    const status = randomNumber(100) > 50;

    return { password, email, status };
};
