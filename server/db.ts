import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

async function initialise() {
  const connectionOptions = await getConnectionOptions();
  const connection = await createConnection({
    ...connectionOptions
  });
  return connection;
}

export default { initialise };
