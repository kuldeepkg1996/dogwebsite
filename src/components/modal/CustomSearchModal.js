import React, { useState } from "react";
import Modal from "./Modal";
import "./customsSearchModal.css";

const CustomSearchModal = ({ onClose }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [images, setImages] = useState([]);

  const handleGetImages = () => {
    if (selectedBreed && numImages > 0) {
      fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random/${numImages}`
      )
        .then((response) => response.json())
        .then((data) => setImages(data.message));
    }
  };

  return (
    <Modal onClose={onClose} title="Custom Search">
      <div className="custom-search-modal">
        <div className="form-group">
          <label>Select a Breed:</label>
          <select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">Select Breed</option>
            {/* Populate options with breed list */}
          </select>
        </div>
        <div className="form-group">
          <label>Number of Images:</label>
          <input
            type="number"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
          />
        </div>
        <button className="get-images-btn" onClick={handleGetImages}>
          Get Images
        </button>
        <div className="images-section">
          {images.length > 0 && (
            <div>
              <h4>
                Showing {numImages} images of {selectedBreed}
              </h4>
              <div className="image-grid">
                {images.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Dog ${index}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomSearchModal;
