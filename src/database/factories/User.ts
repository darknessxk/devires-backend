import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../models/User';
import { passwordHash } from '../../utils';

define(User, (faker: typeof Faker) => {
    const user = new User();

    user.email = faker.internet.email();
    user.status = faker.random.boolean();
    user.password = passwordHash('1234');

    return user;
});
