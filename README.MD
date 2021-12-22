# The Quantum Terminals Game - Server

Client side: https://github.com/oslavdev/memo-the-quantum-terminals-client

(In progress...) This is a remake of my old simple 2D procedurally generated puzzle game **The Quantum Terminals**. In this build I migrated project to **GraphQL** with **TypeScript**.

![Alt text](readme/memo.gif?raw=true 'Cover')

### Technologies

- Apollo
- TypeScript
- GraphQL
- Node.js
- Express
- PostgreSQL
- Redis
- TypeORM
- Docker
- Jest

### Run

Copy .env.example to .env and change evnironment variables to your liking

```sh
docker-compose up

or

yarn

yarn dev

```

Server will run on http://localhost:7100
GraphQl playground http://localhost:7100/graphql

**DEFAULT CLIENT HOST:** http://localhost:8080/

### Environments

See: .env.example

### Testing

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