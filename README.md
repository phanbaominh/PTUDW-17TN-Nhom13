# PTUDW-17TN-Nhom13

## Project Description

A website our university (HCMUS)'s library.

## Team Members

- 1712092: Phan Bảo Minh
- 1712247: Hồ Nguyễn Hải Tuấn
- 1712932: Nguyễn Hy Hoài Lâm

## Usage

_Note: I recommend you use yarn instead of npm._

Pull/clone the repo, navigate to it, run `yarn install` to install all neccessary packages.

Do this only once, please.

### Setup environment variables

- Create a file named `.env` that contains:

```
SESSION_SECRET=<insert a secret string used to sign session cookie here>
IMGUR_CLIENT_ID=<get one by registering at https://api.imgur.com/>
IMGUR_CLIENT_SECRET=<same as above>
```

### Setup database connection

This web application uses PostgreSQL. From this point forward, we assume that you already have PostgreSQL installed on your machine.

- Clone `ormconfig.json.example` into a file named `ormconfig.json`.
- Fill in your database connection info.

### Transpile TypeScript

#### For development purpose:

- `yarn dev:server` to start building server-side code. This script watches for changes in `./server` and re-compiles to JavaScript accordingly.
- `yarn dev:client` to start building client-side code. This script watches for changes in `./client` and re-bundles accordingly.

#### For production purpose:

- `yarn build:server` to compile server-side code.
- `yarn build:client` to bundle client-side code.

### Migrations / Seeding

- Run `yarn migration:run` to run all migrations.
- Run `yarn seed:run` to run all seeders.
- Run `yarn schema:drop` to drop all tables (destroy the db basically, should only be used in development)
- Run `yarn db:rebuild` to run in order `schema:drop`, `migration:run`, `seed:run`

_FYI, migration means a change to the database's structures (tables, columns, etc) and seeding means creating data in those tables and columns._

### Start

- `yarn start`

After this, the web app is host on `localhost:3000`.

## License

MIT
