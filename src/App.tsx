import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { SelectInput } from "./components/SelectInput/SelectInput";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>();
  const [allImages, setAllImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isHomePageLoading, setIsHomePageLoading] = useState<boolean>(false);

  const imagesPerPage = 9;

  const fetchBreeds = async () => {
    try {
      setIsHomePageLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/list/all");

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();
      const breedsArray = Object.keys(result.message);
      setBreeds(breedsArray);
    } catch {
      setIsHomePageLoading(false);
      throw new Error("Las razas no han podido ser cargadas");
    } finally {
      setIsHomePageLoading(false);
    }
  };

  const fetchImagesFromBreed = async (selectedBreed: string) => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images`
      );

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();
      setAllImages(result.message);
      setCurrentPage(1);
    } catch {
      throw new Error("Las imágenes paginadas no han podido ser cargadas");
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

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const paginatedImages = allImages.slice(indexOfFirstImage, indexOfLastImage);

  const isPageLimitEnd = currentPage >= allImages.length / imagesPerPage;
  const isPageLimitBegin = currentPage === 1;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allImages.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isHomePageLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="homePage">
      <button onClick={handlePrevPage} disabled={isPageLimitBegin}>
        prev
      </button>
      <p>{selectedBreed ? currentPage : null}</p>
      <button onClick={handleNextPage} disabled={isPageLimitEnd}>
        next
      </button>
      <SelectInput onChange={handleSelectBreed} items={breeds} />
      {paginatedImages && <ImageGallery images={paginatedImages} />}
    </div>
  );
}

export default App;
