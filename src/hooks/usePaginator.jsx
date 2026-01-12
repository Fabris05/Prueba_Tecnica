import { useState } from "react";

export function usePaginator({ itemsPerPage, filteredData }) {
    
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return{
        currentPage,
        currentData,
        totalPages,
        handleNext,
        handlePrev,
        setCurrentPage
    }
}
