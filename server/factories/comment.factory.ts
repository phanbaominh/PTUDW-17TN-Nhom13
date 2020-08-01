import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Comment } from '../entities/Comment';
define(Comment, (faker: typeof Faker) => {
  const comment = new Comment();
  comment.content = faker.lorem.paragraph(faker.random.number({min: 3, max: 7}));
  comment.createdAt = faker.date.between('2020-01-01', '2020-07-01');
  return comment;
});