import React, { useState, useEffect } from "react";
import BreedModal from "./modal/BreedModal";
import "./BreedList.css"; // Import the corresponding CSS file

const BreedsList = () => {
  const [breeds, setBreeds] = useState([]);
  const [breedImages, setBreedImages] = useState({});
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => setBreeds(Object.keys(data.message)));
  }, []);

  useEffect(() => {
    const fetchBreedImages = async () => {
      const breedImagePromises = breeds.map(async (breed) => {
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`
        );
        const data = await response.json();
        return { breed, image: data.message };
      });

      const imagesData = await Promise.all(breedImagePromises);
      const imagesMap = {};
      imagesData.forEach(({ breed, image }) => {
        imagesMap[breed] = image;
      });
      setBreedImages(imagesMap);
    };

    fetchBreedImages();
  }, [breeds]);

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="breeds-list">
      <div
        style={{
          backgroundColor: "skyblue",
          height: "66px",
          width: "100%",

          display: "flex",
          justifyContent: "center"
        }}
      >
        <h2>Dog Gallery</h2>
      </div>

      <div className="search-input" style={{ padding: "20px" }}>
        <input
          style={{ height: "30px", width: "200px", borderRadius: "10px" }}
          type="text"
          placeholder="Type here to filter by breed..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="breed-cards">
        {filteredBreeds.map((breed) => (
          <li
            key={breed}
            className="breed-card"
            onClick={() => handleBreedClick(breed)}
          >
            <img
              className="breed-image"
              src={breedImages[breed]}
              alt={`${breed}`}
            />
            <p className="breed-name">{breed}</p>
          </li>
        ))}
      </ul>
      {selectedBreed && (
        <BreedModal
          breed={selectedBreed}
          onClose={() => setSelectedBreed(null)}
        />
      )}
    </div>
  );
};

export default BreedsList;
