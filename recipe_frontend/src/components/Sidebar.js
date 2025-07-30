import React from 'react';

// PUBLIC_INTERFACE
function Sidebar({ categories, selectedCategories, onCategoryChange, showFavorites, onShowFavorites }) {
  /** Sidebar for category filters and favorites */

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h4>Categories</h4>
        <ul className="cat-list">
          {categories.map(cat => (
            <li key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <button className="btn favorite" onClick={onShowFavorites} aria-pressed={showFavorites}>
          {showFavorites ? "All Recipes" : "Show Favorites"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
