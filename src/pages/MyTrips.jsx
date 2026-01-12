import { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import { Calendar, Eye, MapPin, Pencil, Plane, Trash2 } from "lucide-react";
import {
    useGetTripsQuery,
    useDeleteTripMutation,
} from "../services/journalsApi";
import { deleteAlert } from "../utils/alerts";
import TravelForm from "../components/TravelForm";
import LoaderSpin from "../components/ui/Loader";
import { formatDate } from "../utils/formatDate";
import Paginator from "../components/ui/Paginator";
import { usePaginator } from "../hooks/usePaginator";
import InputFilter from "../components/InputFilter";
import TripDetailsModal from "../components/TripDetailsModal";

export default function MyTrips() {
    const itemsPerPage = 6;

    const [searchItem, setSearchItem] = useState("");
    const [editingTrip, setEditingTrip] = useState(null);
    const [viewingTrip, setViewingTrip] = useState(null);

    const { isModalOpen } = useModal();
    const [deleteTrip] = useDeleteTripMutation();
    const { data: tripsRaw, isLoading, error } = useGetTripsQuery();
    const tripsFiltered =
        tripsRaw?.filter((trip) => {
            const isRealTrip = trip.id > 100;

            const nameMatch = (trip.countryName || trip.title || "")
                .toLowerCase()
                .includes(searchItem.toLowerCase());

            return isRealTrip && nameMatch;
        }) || [];

    const {
        currentPage,
        currentData,
        totalPages,
        handleNext,
        handlePrev,
        setCurrentPage,
    } = usePaginator({ itemsPerPage, filteredData: tripsFiltered });

    const handleDelete = async (id) => {
        deleteAlert(deleteTrip, id);
    };

    if (isLoading) return <LoaderSpin />;
    if (error)
        return (
            <div className="text-center mt-10 text-red-500">
                Error al cargar tus viajes
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto bg-orange-50 p-6 rounded-md shadow-md mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    <MapPin className="text-blue-600" />
                    Mi Bitácora de Viajes
                </h1>
            </div>
            <div className="mb-6 flex justify-center">
                <InputFilter
                    value={searchItem}
                    onChange={(e) => {
                        setSearchItem(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Buscar en mis viajes..."
                />
            </div>
            {!tripsFiltered || tripsFiltered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Plane className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900">
                        Aún no has registrado viajes
                    </h3>
                    <p className="mt-2 text-gray-500">
                        ¡Explora el mundo y guarda tus recuerdos!
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        Explorar Países
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {currentData.map((trip) => (
                        <div
                            key={trip.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 relative group"
                        >
                            <div className="absolute top-4 right-4 flex flex-col gap-4">
                                <button
                                    className="text-gray-400 hover:text-green-500 cursor-pointer"
                                    title="Ver detalles del viaje"
                                >
                                    <Eye
                                        size={20}
                                        onClick={() => setViewingTrip(trip)}
                                    />
                                </button>

                                <button
                                    onClick={() => setEditingTrip(trip)}
                                    className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                    title="Editar viaje"
                                >
                                    <Pencil size={20} />
                                </button>

                                <button
                                    onClick={() => handleDelete(trip.id)}
                                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                                    title="Eliminar viaje"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-800 pr-6">
                                    {trip.countryName ||
                                        trip.title ||
                                        "Viaje sin nombre"}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                    <span>
                                        {formatDate(trip.date) ||
                                            "Fecha desconocida"}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Plane className="w-4 h-4 mr-2 text-blue-500" />
                                    <span>
                                        {trip.airline ||
                                            "Aerolínea no especificada"}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <span className="flex bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                                        {trip.rating
                                            ? "⭐".repeat(trip.rating)
                                            : "⭐"}
                                    </span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-gray-600 text-sm italic">
                                        "
                                        {trip.description ||
                                            trip.body ||
                                            "Sin descripción..."}
                                        "
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePrev={handlePrev}
                changeCurrentPage={setCurrentPage}
                filteredCountries={tripsFiltered}
            />

            {viewingTrip && (
                <TripDetailsModal 
                    trip={viewingTrip} 
                    onClose={() => setViewingTrip(null)} 
                />
            )}

            {isModalOpen || editingTrip ? (
                <TravelForm
                    countryName={editingTrip?.countryName || ""}
                    tripToEdit={editingTrip}
                    onClose={() => setEditingTrip(null)}
                />
            ) : null}
        </div>
    );
}
