import { define } from "typeorm-seeding";
import { BorrowCard, BorrowStatus } from "../entities/BorrowCard";
import Faker from "faker";
define(BorrowCard, (faker: typeof Faker) => {
  const card = new BorrowCard();
  card.createdAt = faker.date.between('2020-01-01', '2020-07-01');
  const statuses = Object.values(BorrowStatus);
  const randomStatus = statuses[faker.random.number({max: statuses.length - 1})];
  card.status = randomStatus;
  if (card.status === BorrowStatus.BORROWED || card.status === BorrowStatus.RETURNED){
    card.borrowedAt = faker.date.between('2020-07-01', new Date());
  }
  return card;
});
