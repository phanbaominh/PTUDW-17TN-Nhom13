import Faker from "faker";
import { define } from "typeorm-seeding";
import { Tag } from "../entities/Tag";

define(Tag, (faker: typeof Faker) => {
  const tag = new Tag();
  tag.name = faker.hacker.adjective();
  return tag;
});
