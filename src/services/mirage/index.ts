import { createServer, Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function MakeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `${faker.name.fullName()} ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10, new Date());
        },
      }),
    },

    seeds(server) {
      server.createList("user", 10);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users");
      this.post("/users");

      this.namespace = "";

      this.passthrough();
    },
  });

  return server;
}
