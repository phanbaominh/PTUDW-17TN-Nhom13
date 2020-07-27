import { BaseEntity } from "typeorm";

async function getRand<T extends BaseEntity>(Entity: typeof BaseEntity, limit = 1): Promise<T[]>{
  const result = await Entity
    .createQueryBuilder()
    .orderBy("RANDOM()")
    .limit(limit)
    .getMany();
  return result as T[];
}

async function findOrCreate<T extends BaseEntity>(Entity: typeof BaseEntity, key, values): Promise<T[]>{
  const things: T[] = [];
  for (const value of values){
    let thing = await Entity.findOne({[key]: value});
    if (!thing){
      thing = new Entity();
      thing[key] = value;
      await thing.save(); 
    }
    things.push(thing as T);
  }
  return things;
}

function getAll<T extends BaseEntity>(Entity: typeof BaseEntity): Promise<T[]>{
  return Entity.createQueryBuilder().getMany() as Promise<T[]>;
}

const EntityHelpers = {
  getRand,
  getAll,
  findOrCreate,
}

export default EntityHelpers;