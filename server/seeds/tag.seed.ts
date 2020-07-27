import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Tag } from '../entities/Tag'

class CreateTags implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Tag)().createMany(10)
  }
}

module.exports = {
  CreateTags,
}