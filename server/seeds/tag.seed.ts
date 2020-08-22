import { Factory, Seeder } from "typeorm-seeding";
import { Tag } from "../entities/Tag";

class CreateTags implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Tag)().createMany(10);
  }
}

module.exports = {
  CreateTags,
};
