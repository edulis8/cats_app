import { useState, useEffect } from 'react';
import '../styles/Cat.css';

export default function Cat() {
  const [catImage, setCatImage] = useState(null);
  const [catStack, setCatStack] = useState([]);
  const [trashedCats, setTrashedCats] = useState([]);
  const [showTrash, setShowTrash] = useState(false);
  const [draggedCat, setDraggedCat] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCat();
  }, []);

  const fetchCat = async (addCurrentToStack = true) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      const newCat = data[0].url;

      // If we have a current cat and should add it to stack
      if (catImage && addCurrentToStack) {
        setCatStack((prev) => [catImage, ...prev]);
      }
      setCatImage(newCat);
    } catch (error) {
      console.error('Failed to fetch cat:', error);
      const fallbackCat = `https://placekitten.com/400/400?random=${Math.random()}`;
      if (catImage && addCurrentToStack) {
        setCatStack((prev) => [catImage, ...prev]);
      }
      setCatImage(fallbackCat);
    }
    setLoading(false);
  };

  const saveCatToStack = () => {
    if (catImage) {
      setCatStack((prev) => [catImage, ...prev]);
    }
  };

  const rejectCat = () => {
    // Send current cat to trash
    if (catImage) {
      setTrashedCats((prev) => [catImage, ...prev]);
    }
    // Get new cat without adding current to stack
    fetchCat(false);
  };

  const removeStackedCat = (cat) => {
    // Move cat to trash
    setCatStack((prev) => {
      const idx = prev.indexOf(cat);
      return prev.filter((_, i) => i !== idx);
    });
    setTrashedCats((prev) => [cat, ...prev]);
  };

  const restoreCat = (cat) => {
    // Move cat back from trash to stack
    setTrashedCats((prev) => {
      const idx = prev.indexOf(cat);
      return prev.filter((_, i) => i !== idx);
    });
    setCatStack((prev) => [cat, ...prev]);
  };

  const handleDragStart = (e, cat) => {
    setDraggedCat(cat);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnTrash = (e) => {
    e.preventDefault();
    if (draggedCat) {
      removeStackedCat(draggedCat);
      setDraggedCat(null);
    }
  };

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 0.1,
      duration: 0.8 + Math.random() * 0.4,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  };

  const handleGetAnotherCat = () => {
    createSparkles();
    fetchCat(true);
  };

  return (
    <div className="cat-page">
      {/* Stack on left */}
      <div className="cat-stack-container">
        <div className="cat-stack">
          {catStack.slice(0, 10).map((cat, idx) => (
            <div key={idx} className="stacked-cat-wrapper">
              <div
                className="stacked-cat"
                draggable
                onDragStart={(e) => handleDragStart(e, cat)}
              >
                <img src={cat} alt="Stacked cat" />
              </div>
              <button
                className="stacked-cat-delete"
                onClick={() => removeStackedCat(cat)}
                title="Delete this cat"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Trash can */}
        <div
          className="trash-can"
          onClick={() => setShowTrash(true)}
          onDragOver={handleDragOver}
          onDrop={handleDropOnTrash}
          title="Drag cats here to delete, click to open"
        >
          🗑️ ({trashedCats.length})
        </div>
      </div>

      {/* Main cat in center */}
      <div className="cat-center">
        <div className="cat-container">
          {loading ? (
            <div className="cat-loading">🐱 Loading cat...</div>
          ) : (
            <img src={catImage} alt="A cute cat" className="cat-image" />
          )}
        </div>
        <div className="cat-buttons">
          <button className="cat-button cat-button-save" onClick={saveCatToStack} disabled={loading}>
            💾 Save to Stack
          </button>
          <button className="cat-button cat-button-reject" onClick={rejectCat} disabled={loading}>
            ✕ Reject
          </button>
          <button className="cat-button cat-button-next" onClick={handleGetAnotherCat} disabled={loading}>
            ➜ Get Another Cat
          </button>
        </div>

        {/* Sparkles */}
        <div className="sparkles-container">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.left}%`,
                '--delay': `${sparkle.delay}s`,
                '--duration': `${sparkle.duration}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Trash modal */}
      {showTrash && (
        <div className="trash-modal-overlay" onClick={() => setShowTrash(false)}>
          <div className="trash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="trash-modal-header">
              <h2>🗑️ Trash ({trashedCats.length})</h2>
              <button className="trash-modal-close" onClick={() => setShowTrash(false)}>✕</button>
            </div>
            <div className="trash-modal-content">
              {trashedCats.length === 0 ? (
                <p className="trash-empty">No cats in trash</p>
              ) : (
                <div className="trash-grid">
                  {trashedCats.map((cat, idx) => (
                    <div key={idx} className="trash-cat">
                      <img src={cat} alt="Trashed cat" />
                      <button
                        className="restore-btn"
                        onClick={() => restoreCat(cat)}
                        title="Restore this cat"
                      >
                        ↺ Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
