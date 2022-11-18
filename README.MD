# The Quantum Terminals Game - Server

Client side: https://github.com/oslavdev/memo-the-quantum-terminals-client

(In progress...) This is a remake of my old simple 2D procedurally generated puzzle game **The Quantum Terminals**. In this build I migrated project to **GraphQL** with **TypeScript**.

![Alt text](readme/memo.gif?raw=true 'Cover')

# Stack

**Backend**: Node.js, Nexus, Prisma, Typescript, Posgres, Apollo GraphQl

**Frontend**: React.js, Typescript, Apollo GraphQL

**DevOps**: Docker

# Usage

**Requirements**: Docker, Docker Compose, Yarn, Node.js

**Setup**

- `make setup`
  - Set "Databse URL". Example: `postgres://postgres:postgres@127.0.0.1:5432/database`
  - Set JWT_SECRET
  - Set PORT the server will run on
  - Set CLIENT_URL for cors

**Development**

- `make server` sStarts development server, http://localhost:4000/graphql)


**DEFAULT CLIENT HOST:** http://localhost:8080/

# Environments

See: .env.example

# DB Migration

```bash
    npx prisma migrate dev --name init --preview-feature
```

# Testing

```sh
	$ yarn test

```

**For coverage**

```sh
	$ yarn test:coverage

```

**Update snapshots**

```sh
	$ yarn test:update
```


