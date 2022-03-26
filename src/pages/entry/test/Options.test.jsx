import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm all text of images
  const allText = scoopImages.map((element) => element.alt);
  expect(allText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each tooping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toopingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toopingImages).toHaveLength(3);

  const allText = toopingImages.map((element) => element.alt);
  expect(allText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
