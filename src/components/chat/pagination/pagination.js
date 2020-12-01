import React, { useEffect, useState } from 'react';
import './pagination.css';

const Pagination = ({ totalPages, currentPage, changePage }) => {
    const [isPrevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [isNextBtnDisabled, setNextBtnDisabled] = useState(true);

    function handleChangePage(page) {
        changePage(page);
        if (totalPages > 1) {
            if (page === 1) {
                setPrevBtnDisabled(true);
                setNextBtnDisabled(false);
            } else if (page === totalPages) {
                setPrevBtnDisabled(false);
                setNextBtnDisabled(true);
            } else {
                setPrevBtnDisabled(false);
                setNextBtnDisabled(false);
            }
        }
    }

    useEffect(() => {
        handleChangePage(currentPage);
    }, [totalPages, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="pagination-container">
            <button
                className="pagination-btn"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={isPrevBtnDisabled}
            >
                prev
            </button>
            <div className="pagination-text">
                {currentPage} of {totalPages} pages
            </div>
            <button
                className="pagination-btn"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={isNextBtnDisabled}
            >
                next
            </button>
        </div>
    );
};

export default Pagination;
