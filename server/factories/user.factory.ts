import { User } from "../entities/User";
import Faker from "faker";
import { define } from "typeorm-seeding";

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.username = faker.random.number({ min: 100000, max: 200000 }).toString();
  user.fullname = `${firstName} ${lastName}`;
  user.password = "123456";
  user.gender = gender ? "Nam" : "Nu";
  user.profilePicture = faker.image.imageUrl();
  user.birthdate = faker.date.past();
  user.email = faker.internet.email();
  user.phone = `0${faker.random.number({ min: 100000000, max: 1000000000 })}`;
  user.address = `${faker.address.streetAddress()}, ${faker.address.citySuffix()}`;
  return user;
});
