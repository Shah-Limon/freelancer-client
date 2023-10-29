import React, { useState } from 'react';

function LoadMore({ data, itemsPerPage }) {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + itemsPerPage);
  };

  return (
    <>
      {/* Render your table using the displayCount state */}
      <table>
        {/* Table content */}
      </table>

      {displayCount < data.length && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load Moredddd
          </button>
        </div>
      )}
    </>
  );
}

export default LoadMore;
