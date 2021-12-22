module.exports = {
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "app",
  entities: ["dist/entity/*.js"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migrations",
  },
};
