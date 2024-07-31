import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageGallery } from "./ImageGallery";
import "@testing-library/jest-dom";

describe("ImageGallery Component", () => {
  it("renders a list of images", () => {
    const images = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ];
    render(<ImageGallery images={images} />);
    const imgElements = screen.getAllByRole("img"); 

    expect(imgElements).toHaveLength(images.length);
    expect(imgElements[0]).toHaveAttribute(images[0])
    expect(imgElements[1]).toHaveAttribute(images[1])
    expect(imgElements[2]).toHaveAttribute(images[2])
    
  });

  it("renders no images when the list is empty", () => {
    render(<ImageGallery images={[]} />);

    expect(screen.queryByRole("img")).toBeNull();
  });
});

