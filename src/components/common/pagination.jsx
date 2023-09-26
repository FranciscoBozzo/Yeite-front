import React from "react";
import PropTypes from 'prop-types'
import _ from "lodash";

const Pagination = ({ moviesCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(moviesCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
              <i className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </i>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
    moviesCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
}


export default Pagination;
