import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import { usePaginator } from "../hooks/usePaginator";
import { useGetAllCountriesQuery } from "../services/countriesApi";
import CountryCard from "../components/CountryCard";
import LoaderSpin from "../components/ui/Loader";
import Paginator from "../components/ui/Paginator";
import InputFilter from "../components/InputFilter";
import { motion } from "framer-motion";
import { gridContainerVariants } from "../utils/animations";

export default function Home() {
    const { data: countries, error, isLoading } = useGetAllCountriesQuery();
    const [searchItem, setSearchItem] = useState("");
    const { filteredCountries, filteredContinents } = useFilter({
        searchItem,
        countries,
    });
    const filteredData = filteredCountries;
    const itemsPerPage = 8;
    const {
        currentPage,
        currentData,
        totalPages,
        handleNext,
        handlePrev,
        setCurrentPage,
    } = usePaginator({ itemsPerPage, filteredData });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchItem, setCurrentPage]);

    if (isLoading) return <LoaderSpin />;
    if (error) return <div>Error al cargar los países</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-end items-center gap-4">
                <div className="relative w-full max-w-md">
                    <InputFilter
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>
            </div>
            <motion.div
                variants={gridContainerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                {currentData?.length > 0 ? (
                    currentData.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No se encontraron países con ese nombre. Inténtelo de
                        nuevo.
                    </p>
                )}
            </motion.div>
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePrev={handlePrev}
                filteredCountries={filteredCountries}
                changeCurrentPage={setCurrentPage}
            />
        </div>
    );
}
