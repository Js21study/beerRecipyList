import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipies } from '../../store';

export const Recipe = ({ id, name, tagline, first_brewed, description, image_url, fullPage }) => {
  const navigate = useNavigate();
  const addedRecipies = useRecipies((state) => state.added);
  const addRecipy = useRecipies((state) => state.addRecipy);
  const deleteRecipy = useRecipies((state) => state.deleteRecipy);
  const selectedRecipy = addedRecipies.find((_id) => _id === id);
  const addToSelected = (e) => {
    e.preventDefault();

    if (!selectedRecipy) {
      addRecipy(id);
    } else {
      deleteRecipy(id);
    }
  };

  return (
    <div
      className={
        fullPage
          ? 'max-w-xl rounded overflow-hidden shadow-lg bg-blue-100 hover:bg-blue-200 p-5 m-2'
          : 'max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 hover:bg-blue-200 p-5 m-2'
      }
      onClick={() => {
        navigate(`/recipe/${id}`);
      }}
      onContextMenu={(e) => addToSelected(e)}
    >
      <div className="px-6 py-4 flex justify-center">
        <img width={50} className="" src={image_url} alt={name} />
      </div>
      <div className="px-6 py-4 flex justify-center">
        <div className="font-bold text-xl mb-2">{name}</div>
      </div>

      {fullPage && <p className="text-gray-700 text-base">{description}</p>}
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2 ">
          {tagline}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2">
          {first_brewed}
        </span>
      </div>
      {selectedRecipy && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          +
        </button>
      )}
    </div>
  );
};
