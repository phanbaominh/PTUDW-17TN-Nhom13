import EntityHelpers from "../entities/helpers";
import { Seeder, Factory } from "typeorm-seeding";
import { Comment } from "../entities/Comment";
import { Book } from "../entities/Book";

let { getRand, getRandomUsers } = EntityHelpers;

class CreateComments implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Comment)()
      .map(async (comment: Comment) => {
        comment.user = (await getRandomUsers(1))[0];
        comment.book = (await getRand<Book>(Book))[0];
        return comment;
      })
      .createMany(50);

    await factory(Comment)()
      .map(async (comment: Comment) => {
        comment.user = (await getRandomUsers(1))[0];
        comment.book = (await getRand<Book>(Book))[0];
        comment.parent = (await getRand<Comment>(Comment))[0];
        return comment;
      })
      .createMany(100);
  }
}

module.exports = {
  CreateComments,
};
