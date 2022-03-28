import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";

import OrderConfirmation from "../OrderConfirmation";

test("error response from server for submitting order", async () => {
  server.resetHandlers(
    rest.post("http://locahost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(
      "An unexpected error occurred. Please try again later"
    );
  });
});
