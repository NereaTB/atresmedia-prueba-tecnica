import { useState, useEffect } from "react";
import "./App.css";

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

  const handleSelectBreed = (event) => {
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
    <div>
      {
        <select name="breeds" onChange={handleSelectBreed}>
          {breeds.map((breed) => {
            return (
              <option key={breed} value={breed}>
                {breed}
              </option>
            );
          })}
        </select>
      }
      <section>
        {selectedImages?.map((image) => {
          return <img key={image} src={image} />;
        })}
      </section>
    </div>
  );
}

export default App;
