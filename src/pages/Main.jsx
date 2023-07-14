import React from 'react';
import { useRecipies } from '../store';
import { Recipe } from '../components/Recipe/Recipe';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Main = () => {
  const recipies = useRecipies((state) => state.recipies);
  const middleItems = recipies.slice(0, 5);

  const [visibleItems, setVisibleItems] = useState(middleItems);
  const addedRecipies = useRecipies((state) => state.added);
  const fetchRecipies = useRecipies((state) => state.fetchRecipies);
  const removeSelectedRecepies = useRecipies((state) => state.removeSelectedRecepies);
  const addPage = useRecipies((state) => state.addPage);
  const addCount = useRecipies((state) => state.addCount);

  const updateVisibleItems = useCallback(() => {
    setVisibleItems(middleItems);
  }, [recipies]);

  useEffect(() => {
    updateVisibleItems();
  }, [updateVisibleItems]);

  const deleteSelectedRecipies = () => {
    addedRecipies.map((id) => removeSelectedRecepies(id));
    const lefteditems = removeSelectedRecepies();

    if (lefteditems.length === 0) {
      addPage();
      addCount();
      fetchRecipies();
    }
  };

  function handleScroll(event) {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight) {
      handleLoadMore();
    }
  }

  function handleLoadMore() {
    setTimeout(() => {
      const nextItems = recipies.slice(visibleItems.length, visibleItems.length + 5);
      setVisibleItems([...visibleItems, ...nextItems]);
    }, 1000);
  }

  return (
    <div className="box">
      {addedRecipies.length > 0 && (
        <button
          onClick={deleteSelectedRecipies}
          className="m-5 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete all
        </button>
      )}

      <InfiniteScroll
        dataLength={visibleItems.length}
        next={handleLoadMore}
        hasMore={visibleItems.length < recipies.length}
        loader={<h4>Loading...</h4>}
        onScroll={handleScroll}
        className="grid"
      >
        {visibleItems.map((obj) => (
          <Recipe key={obj.id} {...obj} fullPage={false}></Recipe>
        ))}
      </InfiniteScroll>
    </div>
  );
};
