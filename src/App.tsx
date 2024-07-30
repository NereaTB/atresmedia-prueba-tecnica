import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState();

 
  const fetchImagesFromBreed = async (selectedBreed: string) => {
    try{
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();

    }catch{

    }
  }

 const fetchBreeds = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const result = await response.json();
      setBreeds(result.message)
      
    } catch {
      throw new Error("Las razas no han podido ser cargadas");
    }
  };


  useEffect(() => {
    fetchBreeds();
  }, []);

  https: return (
    <>      
    </>
  );
}

export default App;
