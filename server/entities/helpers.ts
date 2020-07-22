import { BaseEntity } from "typeorm";

async function getRand<T extends BaseEntity>(Entity: typeof BaseEntity, limit = 1): Promise<T[]>{
  const result = await Entity
    .createQueryBuilder()
    .orderBy("RANDOM()")
    .limit(limit)
    .getMany();
  return result as T[];
}

function getAll<T extends BaseEntity>(Entity: typeof BaseEntity): Promise<T[]>{
  return Entity.createQueryBuilder().getMany() as Promise<T[]>;
}

const EntityHelpers = {
  getRand,
  getAll
}

export default EntityHelpers;