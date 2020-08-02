import "reflect-metadata";
import { createConnection } from "typeorm";

async function initialise() {
  const connection = await createConnection();
  return connection;
}

export default { initialise };
