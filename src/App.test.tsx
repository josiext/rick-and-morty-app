import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  const TitleEl = screen.getByText(/rick & morty/i);
  expect(TitleEl).toBeInTheDocument();
});
