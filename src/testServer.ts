import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  })
);

afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
