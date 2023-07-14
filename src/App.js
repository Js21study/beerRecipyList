import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { FullRecipe } from './pages/FullRecipe';
import { NotFound } from './pages/NotFound';
import { useRecipies } from './store';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const fetchObj = useRecipies((state) => state.fetchRecipies);

  useEffect(() => {
    fetchObj();
  }, []);

  return (
    <div className="bg-yellow-200">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recipe/:id" element={<FullRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
