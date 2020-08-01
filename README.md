# PTUDW-17TN-Nhom13

## Project Description

A website for our university (HCMUS)'s library.

## Team Members

- 1712092: Phan Bảo Minh
- 1712247: Hồ Nguyễn Hải Tuấn
- 1712932: Nguyễn Hy Hoài Lâm

## Usage

We deployed our website to Heroku [here](https://ptudw-17tn-nhom13.herokuapp.com).

Our website's workflow is:

- Students cannot register. All students have to take the library how-to-use class, after that they will be given an account by the school.
- Route `/admin/` contains the administration part of the website, where admins and librarians operate the library. More specifically:
  - Admin: there is one admin only (`admin/admin`). This user can create other librarians's accounts.
  - Librarians: these accounts are the one truly in charge of operating. They can import student's info (given by the school) into the database, manage books, etc. They, however, cannot create librarian accounts like the admin.

The following section contains instructions for running the website _**locally**_.

_Note: I recommend you use yarn instead of npm._

Pull/clone the repo, navigate to it, run `yarn install` to install all neccessary packages.

Do this only once, please.

### Setup environment variables

- Clone `.env.` from `.env.example` and fill in the `<input>` placeholders. Notice that `IMGUR_CLIENT_ID` and `IMGUR_CLIENT_SECRET` are API keys that can be obtained by registering at [https://api.imgur.com](https://api.imgur.com).

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
