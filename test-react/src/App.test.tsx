import {render,screen} from "@testing-library/react";
import App from "./App";

test("verifica que el texto Bienvenidos al curso esté presente", () => {
  render(<App/>);
  const headingElement = screen.getByText(/Bienvenidos al curso/i);
  expect(headingElement).toBeInTheDocument();
});