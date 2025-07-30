import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import AuthModal from './components/AuthModal';
import RecipeFormModal from './components/RecipeFormModal';

/** Main entry for Recipe Explorer UI */

function App() {
  // Theme state
  const [theme, setTheme] = useState('light');

  // ====== Domain state ======
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // UI state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [authError, setAuthError] = useState('');
  const [search, setSearch] = useState('');

  // API endpoint comes from env or fallback
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  // Favorite recipes stored in localStorage (for demo, normally backend)
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch all recipes and categories
  useEffect(() => {
    fetch(`${API_BASE}/recipes`)
      .then(r => r.json())
      .then(data => {
        setRecipes(data);
        setCategories(Array.from(new Set(data.map(r => r.category || "Other"))));
      }).catch(() => setRecipes([]));
  }, []);

  // --------- Category and filter handling ---------
  function handleCategoryChange(cat) {
    setSelectedCategories(sel =>
      sel.includes(cat) ? sel.filter(c => c !== cat) : [...sel, cat]
    );
  }
  function handleShowFavorites() {
    setShowFavorites(f => !f);
  }

  // --------- Authentication (Mock logic for demo) ---------
  // PUBLIC_INTERFACE
  function login({ email, password }) {
    // Demo: accept any non-empty
    if (email && password) {
      setAuthenticated(true);
      setUser({ email });
      setShowLogin(false);
      setAuthError('');
    } else {
      setAuthError("Invalid email or password.");
    }
  }
  // PUBLIC_INTERFACE
  function register({ email, password }) {
    if (email && password) {
      setAuthenticated(true);
      setUser({ email });
      setShowRegister(false);
      setAuthError('');
    } else {
      setAuthError("Registration failed.");
    }
  }
  // PUBLIC_INTERFACE
  function logout() {
    setAuthenticated(false);
    setUser(null);
  }

  // --------- Recipes CRUD (mock API for demo) ---------
  // PUBLIC_INTERFACE
  function onAddRecipe(recipe) {
    // Demo: Add directly to list
    const newRecipe = { ...recipe, id: Date.now() };
    setRecipes(r => [...r, newRecipe]);
    setShowRecipeForm(false);
  }
  // PUBLIC_INTERFACE
  function onEditRecipe(recipe) {
    setRecipes(recipes.map(r => (r.id === recipe.id ? recipe : r)));
    setShowRecipeForm(false);
    setEditingRecipe(null);
  }
  // PUBLIC_INTERFACE
  function onDeleteRecipe(id) {
    if (window.confirm("Are you sure to delete?")) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  }
  // PUBLIC_INTERFACE
  function onToggleFavorite(id) {
    setFavorites(favs =>
      favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
    );
  }

  // --------- UI: Filtering, Searching, Composing Lists ---------
  // Filtered list: by category, favorite, search
  const filteredRecipes = recipes.filter(recipe => {
    if (showFavorites && !favorites.includes(recipe.id)) return false;
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(recipe.category)
    )
      return false;
    if (
      search &&
      !(
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        (recipe.description || "").toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  // ===== RENDER =====
  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={logout}
        onShowLogin={() => { setShowLogin(true); setAuthError(''); }}
        onShowRegister={() => { setShowRegister(true); setAuthError(''); }}
      />
      <div className="main-layout">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          showFavorites={showFavorites}
          onShowFavorites={handleShowFavorites}
        />
        <main className="content">
          <div className="main-bar">
            <input
              className="search-bar"
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {isAuthenticated && (
              <button className="btn accent" style={{ marginLeft: 12 }} onClick={() => { setEditingRecipe(null); setShowRecipeForm(true); }}>
                Add Recipe
              </button>
            )}
            <button
              className="theme-toggle"
              onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <RecipeGrid
            recipes={filteredRecipes}
            onSelect={setViewingRecipe}
            onEdit={r => { setEditingRecipe(r); setShowRecipeForm(true); }}
            onDelete={onDeleteRecipe}
            onToggleFavorite={onToggleFavorite}
            favorites={favorites}
            isAuthenticated={isAuthenticated}
          />
        </main>
      </div>

      {/* Modals */}
      {showLogin && (
        <AuthModal
          mode="login"
          onSubmit={login}
          onClose={() => setShowLogin(false)}
          error={authError}
        />
      )}
      {showRegister && (
        <AuthModal
          mode="register"
          onSubmit={register}
          onClose={() => setShowRegister(false)}
          error={authError}
        />
      )}
      {showRecipeForm && (
        <RecipeFormModal
          initialRecipe={editingRecipe}
          onSubmit={r => {
            if (editingRecipe) onEditRecipe({ ...editingRecipe, ...r });
            else onAddRecipe(r);
          }}
          onClose={() => { setShowRecipeForm(false); setEditingRecipe(null); }}
        />
      )}
      <RecipeModal
        recipe={viewingRecipe}
        onClose={() => setViewingRecipe(null)}
      />
    </div>
  );
}

export default App;
