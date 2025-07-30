import React from 'react';

// PUBLIC_INTERFACE
function RecipeModal({ recipe, onClose }) {
  /** Modal for viewing recipe details */
  if (!recipe) return null;
  return (
    <div className="modal-overlay" onClick={onClose} data-testid="modal-overlay">
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="modal-header">
          <img src={recipe.image || "/placeholder-recipe.png"} alt={recipe.title} className="modal-img" />
          <div>
            <h2>{recipe.title}</h2>
            <span className="cat-pill">{recipe.category}</span>
          </div>
        </div>
        <div className="modal-body">
          <p className="detail-description">{recipe.description}</p>
          <div>
            <h4>Ingredients</h4>
            <ul>
              {Array.isArray(recipe.ingredients) && recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
          </div>
          <div>
            <h4>Instructions</h4>
            <ol>
              {Array.isArray(recipe.instructions) && recipe.instructions.map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
