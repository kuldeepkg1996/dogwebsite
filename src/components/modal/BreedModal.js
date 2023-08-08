import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./BreedModal.css";

const BreedModal = ({ breed, onClose }) => {
  const [subBreeds, setSubBreeds] = useState([]);
  const [subBreedImages, setSubBreedImages] = useState({});
  const [moreImages, setMoreImages] = useState([]);

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breed}/list`)
      .then((response) => response.json())
      .then((data) => setSubBreeds(data.message));
  }, [breed]);

  useEffect(() => {
    if (subBreeds.length > 0) {
      const subBreedImagePromises = subBreeds.map((subBreed) =>
        fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
          .then((response) => response.json())
          .then((data) => ({ subBreed, image: data.message }))
      );

      Promise.all(subBreedImagePromises).then((imagesData) => {
        const imagesMap = {};
        imagesData.forEach(({ subBreed, image }) => {
          imagesMap[subBreed] = image;
        });
        setSubBreedImages(imagesMap);
      });
    }
  }, [subBreeds, breed]);

  const fetchMoreImages = () => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`)
      .then((response) => response.json())
      .then((data) => setMoreImages(data.message));
  };

  return (
    <Modal onClose={onClose} title={breed}>
      <div className="breed-modal">
        <div className="sub-breeds-section">
          {subBreeds.length > 0 ? (
            <div>
              <h3>Sub-Breeds</h3>
              <ul>
                {subBreeds.map((subBreed) => (
                  <li key={subBreed}>
                    {subBreed}
                    {subBreedImages[subBreed] && (
                      <img src={subBreedImages[subBreed]} alt={subBreed} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No sub-breeds for {breed}.</p>
          )}
        </div>
        <div className="more-images-section">
          <h3>More Images</h3>
          <button className="get-more-images-btn" onClick={fetchMoreImages}>
            Get More Images
          </button>
          <div className="image-grid">
            {moreImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Dog ${index}`} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BreedModal;
