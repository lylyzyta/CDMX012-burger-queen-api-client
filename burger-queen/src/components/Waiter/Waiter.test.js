import { render, screen } from "@testing-library/react";
import Waiter from "./Waiter"

test("render buttons", () => {
    render(<Waiter />);
    const buttonBreakfast = screen.getAllByText("Breakfast")
    expect(buttonBreakfast).getByText();
})