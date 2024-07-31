import { useState, useEffect, ChangeEvent } from "react";
import "./App.scss";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { SelectInput } from "./components/SelectInput/SelectInput";
import { Loader } from "./components/Loader/Loader";
import { PaginationButtons } from "./components/PaginationButtons/PaginationButtons";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>();
  const [allImages, setAllImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  const imagesPerPage = 8;

  const fetchBreeds = async () => {
    try {
      setIsAppLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/list/all");

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();
      const breedsArray = Object.keys(result.message);
      setBreeds(breedsArray);
    } catch {
      throw new Error("The breeds could not be loaded");
    } finally {
      setIsAppLoading(false);
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
      throw new Error("The paginated images could not be loaded");
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

  if (isAppLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <section className="app__topBar">
          <PaginationButtons
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            isPageLimitBegin={isPageLimitBegin}
            isPageLimitEnd={isPageLimitEnd}
            currentPage={currentPage}
            isPageCounterActive={Boolean(selectedBreed)}
          />
          <SelectInput onChange={handleSelectBreed} items={breeds} />
        </section>
        {paginatedImages && <ImageGallery images={paginatedImages} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
