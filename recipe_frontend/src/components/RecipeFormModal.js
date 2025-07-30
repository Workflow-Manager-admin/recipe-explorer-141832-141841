import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
function RecipeFormModal({ initialRecipe, onSubmit, onClose }) {
  /** Modal dialog for add/edit recipe */
  const [recipe, setRecipe] = useState({
    title: '', description: '', image: '',
    category: '', ingredients: [''], instructions: [''],
  });

  useEffect(() => {
    if (initialRecipe) {
      setRecipe({
        ...initialRecipe,
        ingredients: initialRecipe.ingredients || [''],
        instructions: initialRecipe.instructions || [''],
      });
    }
  }, [initialRecipe]);

  // Handle form field changes
  function handleChange(e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }

  function handleListChange(kind, idx, value) {
    setRecipe({
      ...recipe,
      [kind]: recipe[kind].map((item, i) => (i === idx ? value : item)),
    });
  }

  function handleListAdd(kind) {
    setRecipe({
      ...recipe,
      [kind]: [...recipe[kind], ''],
    });
  }

  function handleListRemove(kind, idx) {
    setRecipe({
      ...recipe,
      [kind]: recipe[kind].filter((item, i) => i !== idx),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(recipe);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{initialRecipe ? "Edit Recipe" : "Add Recipe"}</h2>
        <form className="recipe-form" onSubmit={handleSubmit}>
          <input
            required
            name="title"
            placeholder="Title"
            value={recipe.title}
            onChange={handleChange}
          />
          <input
            name="image"
            placeholder="Image URL"
            value={recipe.image}
            onChange={handleChange}
          />
          <input
            name="category"
            required
            placeholder="Category"
            value={recipe.category}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="A quick description..."
            value={recipe.description}
            onChange={handleChange}
          />
          <div>
            <label>Ingredients</label>
            {recipe.ingredients.map((ing, idx) => (
              <div key={'ingredient-' + idx} className="recipe-list-item">
                <input
                  required
                  value={ing}
                  onChange={e => handleListChange('ingredients', idx, e.target.value)}
                />
                <button type="button" onClick={() => handleListRemove('ingredients', idx)}>-</button>
              </div>
            ))}
            <button type="button" onClick={() => handleListAdd('ingredients')}>Add Ingredient</button>
          </div>
          <div>
            <label>Instructions</label>
            {recipe.instructions.map((step, idx) => (
              <div key={'instruction-' + idx} className="recipe-list-item">
                <input
                  required
                  value={step}
                  onChange={e => handleListChange('instructions', idx, e.target.value)}
                />
                <button type="button" onClick={() => handleListRemove('instructions', idx)}>-</button>
              </div>
            ))}
            <button type="button" onClick={() => handleListAdd('instructions')}>Add Step</button>
          </div>
          <button type="submit" className="btn accent wide">Save</button>
        </form>
      </div>
    </div>
  );
}

export default RecipeFormModal;
