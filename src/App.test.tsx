import App from "./App";
import { render, screen } from "@testing-library/react";

test("renders <App/>", () => {
  render(<App />);

  const appName = screen.getByText("Droppe");
  expect(appName).toBeInTheDocument();
});
