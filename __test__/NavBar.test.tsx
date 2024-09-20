import { render, screen } from "@testing-library/react";
import Navbar from "@/src/components/NavBar";
import { it } from "node:test";

it("should have Profile", () => {
  render(<Navbar />); // Arrange

  const myElement = screen.getByText("Profile"); // Act

  expect(myElement).toBeInTheDocument(); // Assert
});
