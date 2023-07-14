import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Recipe } from '../components/Recipe/Recipe';

export const FullRecipe = () => {
  const [recipe, setRecipe] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchRecipies() {
      try {
        const { data } = await axios.get('https://api.punkapi.com/v2/beers/' + id);
        setRecipe(data);
      } catch (error) {
        alert('error with products catching');
        navigate('/');
      }
    }

    fetchRecipies();
  }, []);

  if (!recipe) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="p-10 flex justify-center">
        {recipe.map((obj) => (
          <Recipe key={obj.id} {...obj} fullPage={true}></Recipe>
        ))}
      </div>

      <div className="p-10"></div>
      <div className="p-10"></div>
    </>
  );
};
