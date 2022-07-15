import { fireEvent, render, screen } from "@testing-library/react";

import CharactersScreen from "./index";

describe("<CharactersScreen />", () => {
  test("can search a character", () => {
    render(<CharactersScreen />);

    const InputEl = screen.getByPlaceholderText(
      /search a character.../i
    ) as HTMLInputElement;

    fireEvent.change(InputEl, { target: { value: "rick" } });
    expect(InputEl.value).toBe("rick");
  });
});
