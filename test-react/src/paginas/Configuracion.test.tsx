import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Configuracion from "./Configuracion";


import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () =>mockNavigate,
})
);



describe("La página de configuración", () => {
  test("Debe ser renderizada correctamente", () => {
    const {container} = render(
        <Provider store={store}>
            <Configuracion/>
        </Provider>
    )

    expect(container).toMatchSnapshot()

  })
})