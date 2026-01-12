import { useGetCountryByCodeQuery } from "../services/countriesApi";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookMarked } from "lucide-react";
import TravelForm from "../components/TravelForm";
import LoaderSpin from "../components/ui/Loader";
import { useModal } from "../hooks/useModal";

export default function CountryDetail() {
    const {isModalOpen, openModal, closeModal} = useModal();
    const { code } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetCountryByCodeQuery(code);
    const country = data ? data[0] : null;

    if (isLoading) return <LoaderSpin />;
    if (error || !country)
        return <div>Error al cargar los detalles del país</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={20} className="mr-2" />
                Volver
            </button>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64 md:h-auto">
                    <img
                        src={country.flags.svg}
                        alt={country.flags.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {country.name.common}
                    </h1>
                    <div className="space-y-3 text-gray-700">
                        <p>
                            {" "}
                            <span className="font-semibold">
                                Nombre Oficial:
                            </span>
                            {country.name.official}{" "}
                        </p>
                        <p>
                            {" "}
                            <span className="font-semibold">Región:</span>{" "}
                            {country.region}{" "}
                        </p>
                        <p>
                            {" "}
                            <span className="font-semibold">
                                Subregión:
                            </span>{" "}
                            {country.subregion}{" "}
                        </p>
                        <p>
                            {" "}
                            <span className="font-semibold">Capital:</span>{" "}
                            {country.capital ? country.capital[0] : "N/A"}{" "}
                        </p>
                        <p>
                            {" "}
                            <span className="font-semibold">
                                Población:
                            </span>{" "}
                            {country.population.toLocaleString()}{" "}
                        </p>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={openModal}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full md:w-auto font-semibold cursor-pointer"
                        >
                            Registrar visita
                            <BookMarked
                                size={20}
                                className="inline-block ml-2 w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <TravelForm
                    countryName={country.name.common}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
