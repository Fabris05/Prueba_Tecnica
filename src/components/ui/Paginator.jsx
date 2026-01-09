import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Paginator({
    currentPage,
    totalPages,
    handleNext,
    handlePrev,
    filteredCountries,
    changeCurrentPage,
}) {
    
    return (
        <>
            {filteredCountries?.length > 0 && (
                <div className="flex justify-center items-center mt-10 space-x-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="">
                        <span>Página</span>
                        <input
                            type="number"
                            value={currentPage}
                            min={1}

                            max={totalPages}
                            className="w-12 text-center mx-2 border border-gray-300 rounded-md p-1"
                            onChange={(e) =>
                                changeCurrentPage(Number(e.target.value))
                            }
                        />
                        <span> de {totalPages} </span>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            )}
        </>
    );
}
