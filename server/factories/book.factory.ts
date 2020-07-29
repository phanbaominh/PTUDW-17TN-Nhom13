import { Book } from "../entities/Book";
import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { BookLanguage } from "../entities/BookLanguage";

function generateName(faker: typeof Faker){
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  return `${firstName} ${lastName}`;
}

function generateTestimonials(faker: typeof Faker): string{
  const testimonials = [
    {
      reviewer: generateName(faker),
      quote: faker.lorem.sentences(3),
      title: faker.name.jobTitle(),
      avatar: faker.internet.avatar(),
    },
    {
      reviewer: generateName(faker),
      quote: faker.lorem.sentences(3),
      title: faker.name.jobTitle(),
      avatar: faker.internet.avatar(),
    }
  ]
  return JSON.stringify(testimonials);
}

define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.author = generateName(faker);
  book.bookCount = faker.random.number({min: 1, max: 10});
  book.pageCount = faker.random.number({min: 50, max: 500});
  book.publisher = faker.company.companyName();
  book.publishingYear = faker.random.number({min: 1999, max: 2020});
  book.desc = faker.lorem.paragraphs(faker.random.number({min:1, max: 3}));
  book.coverImage = `${faker.image.technics()}?random=${Date.now()}`;
  book.createdAt = faker.date.between('2020-01-01', '2020-07-01');
  book.title = faker.lorem.words(faker.random.number({min:1, max: 10}));
  book.testimonial = generateTestimonials(faker);
  return book;
});