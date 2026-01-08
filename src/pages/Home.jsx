import { useState } from "react";
import { useGetAllCountriesQuery } from "../services/countriesApi";
import CountryCard from "../components/CountryCard";
import LoaderSpin from "../components/ui/Loader";
import { Search } from "lucide-react";

export default function Home() {
    const { data: countries, error, isLoading } = useGetAllCountriesQuery();
    const [searchItem, setSearchItem] = useState("");

    const filteredCountries = countries?.filter((country) =>
        country.name.common.toLowerCase().includes(searchItem.toLowerCase())
    );

    if (isLoading) return <LoaderSpin />;
    if (error) return <div>Error al cargar los países</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-gray-400" size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar país"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCountries?.length > 0 ? (
                    filteredCountries.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No se encontraron países con ese nombre. Inténtelo de
                        nuevo.
                    </p>
                )}
            </div>
        </div>
    );
}
