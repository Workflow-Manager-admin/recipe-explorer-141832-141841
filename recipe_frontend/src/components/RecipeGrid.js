import React from 'react';

// PUBLIC_INTERFACE
function RecipeGrid({ recipes, onSelect, onEdit, onDelete, onToggleFavorite, favorites, isAuthenticated }) {
  /** Flexible grid for recipe cards */
  return (
    <div className="recipe-grid">
      {recipes.length === 0 && (
        <div className="grid-placeholder">No recipes found.</div>
      )}
      {recipes.map(recipe => (
        <div
          className="recipe-card"
          key={recipe.id}
          tabIndex={0}
          onClick={() => onSelect(recipe)}
        >
          <div className="card-img-wrap">
            <img src={recipe.image || "/placeholder-recipe.png"} alt={recipe.title} className="card-img" />
          </div>
          <div className="card-content">
            <h3>{recipe.title}</h3>
            <div className="card-row">
              <span className="cat-pill">{recipe.category}</span>
              <button
                className={`fav-btn ${favorites.includes(recipe.id) ? "active" : ""}`}
                title={favorites.includes(recipe.id) ? "Unfavorite" : "Add to favorites"}
                onClick={e => { e.stopPropagation(); onToggleFavorite(recipe.id); }}>
                {favorites.includes(recipe.id) ? "★" : "☆"}
              </button>
            </div>
            <p className="card-desc">{recipe.description || ""}</p>
            {isAuthenticated && (
              <div className="card-actions">
                <button className="btn small" onClick={e => { e.stopPropagation(); onEdit(recipe); }}>✏️ Edit</button>
                <button className="btn small delete" onClick={e => { e.stopPropagation(); onDelete(recipe.id); }}>🗑️</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeGrid;
