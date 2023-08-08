import React, { useState } from "react";
import BreedsList from "./components/BreedsList";
import BreedModal from "./components/modal/BreedModal";
import CustomSearchModal from "./components/modal/CustomSearchModal";

const App = () => {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [showCustomSearchModal, setShowCustomSearchModal] = useState(false);

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
    setShowBreedModal(true);
  };

  return (
    <div>
      <BreedsList onBreedClick={handleBreedClick} />
      {showBreedModal && (
        <BreedModal
          breed={selectedBreed}
          onClose={() => setShowBreedModal(false)}
        />
      )}
      {showCustomSearchModal && (
        <CustomSearchModal onClose={() => setShowCustomSearchModal(false)} />
      )}
    </div>
  );
};

export default App;
