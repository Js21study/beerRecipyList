import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="box bg-gray-800 p-5">
      <div className="text-white">
        <Link to={'/'} className="text-lg" style={{ fontFamily: 'Permanent Marker' }}>
          Beer Recipies
        </Link>
      </div>
    </header>
  );
}

export default Header;
