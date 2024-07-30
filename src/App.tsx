import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { SelectInput } from "./components/SelectInput/SelectInput";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>();
  const [selectedImages, setSelectedImages] = useState<string[]>();

  const fetchImagesFromBreed = async (selectedBreed: string) => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images`
      );

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();
      setSelectedImages(result.message);
    } catch {
      throw new Error("Las imágenes paginadas no han podido ser cargadas");
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();
      const breedsArray = Object.keys(result.message);
      setBreeds(breedsArray);
    } catch {
      throw new Error("Las razas no han podido ser cargadas");
    }
  };

  const handleSelectBreed = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(event.target.value);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      fetchImagesFromBreed(selectedBreed);
    }
  }, [selectedBreed]);

  return (
    <div className="homePage">
      <SelectInput onChange={handleSelectBreed} items={breeds} />
      {selectedImages && <ImageGallery images={selectedImages} />}
    </div>
  );
}

export default App;
