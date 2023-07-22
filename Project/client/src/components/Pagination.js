import React from "react";

const Pagination = ({ ticketsPerPage, totalTickets, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTickets / ticketsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav class="border border-primary">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href='#!' className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default Pagination;