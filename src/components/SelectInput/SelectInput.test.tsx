import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SelectInput } from "./SelectInput";
import "@testing-library/jest-dom";

describe("SelectInput Component", () => {
  it("renders a list of options", () => {
    const items = ["Option 1", "Option 2", "Option 3"];
    render(<SelectInput items={items} onChange={() => {}} />);
    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(items.length);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });
});
