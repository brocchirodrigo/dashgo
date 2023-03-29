import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

const date = new Date();

export function MakeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,

    serializers: {
      application: ActiveModelSerializer,
    },

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
        created_at() {
          return faker.date.recent(
            10,
            new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            ).toISOString()
          );
        },
      }),
    },

    seeds(server) {
      server.createList("user", 200);
    },

    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total: number = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);

        const pageEnd = pageStart + Number(per_page);

        // @ts-ignore
        const users: Partial<User[]> = this.serialize(
          schema
            .all("user")
            .sort((a: any, b: any) => a.created_at - b.created_at)
        ).users.slice(pageStart, pageEnd);

        return new Response(200, { "x-total-count": String(total) }, { users });
      });

      this.get(`/users/:id`);
      this.post("/users");

      this.namespace = "";

      this.passthrough();
    },
  });

  return server;
}
