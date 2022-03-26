import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import useEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /Confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enable button on first click and disables on second click", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /Confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  useEvent.click(checkbox);
  expect(button).toBeEnabled();

  useEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice scream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upoon mouseouver of checkbox label
  const termAndConditions = screen.getByText(/terms and conditions/i);
  useEvent.hover(termAndConditions);

  const popover = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disapperars when we mouse out
  useEvent.unhover(termAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No ice cream will actually be delivered/i)
  );
});
