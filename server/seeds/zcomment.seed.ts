import EntityHelpers from "../entities/helpers";
import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

const getRand = EntityHelpers.getRand;
class CreateComments implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Comment)()
      .map(async (comment: Comment) => {
        comment.user = (await getRand<User>(User))[0];
        comment.book = (await getRand<Book>(Book))[0];
        return comment;
      }).createMany(50);
    await factory(Comment)()
      .map(async (comment: Comment) => {
        comment.user = (await getRand<User>(User))[0];
        comment.book = (await getRand<Book>(Book))[0];
        comment.parent = (await getRand<Comment>(Comment))[0];
        return comment;
      }).createMany(50);
  }
}

module.exports = {
  CreateComments,
}