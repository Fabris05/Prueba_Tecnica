import { formatDate } from "../utils/formatDate";
import { Calendar, FileText, MapPin, Plane, Star, X } from "lucide-react";

export default function TripDetailsModal({ trip, onClose }) {
    if (!trip) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white relative">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                        <MapPin size={18} />
                        <span className="text-sm font-medium uppercase tracking-wider">
                            Detalles del Viaje
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold">
                        {trip.countryName || trip.title}
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Calendar size={18} />
                                <span className="font-semibold text-sm">
                                    Fecha del viaje
                                </span>
                            </div>
                            <p className="text-gray-700 font-medium">
                                {formatDate(trip.date)}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Plane size={18} />
                                <span className="font-semibold text-sm">
                                    Aerolínea que utilicé
                                </span>
                            </div>
                            <p className="text-gray-700 font-medium">
                                {trip.airline || "No especificada"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Star size={18} className="text-yellow-500" />
                            <span className="text-sm font-medium">
                                Mi calificación de la experiencia
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={24}
                                    className={
                                        i < trip.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-200"
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <FileText size={18} />
                            <span className="text-sm font-medium">
                                Reseña personal
                            </span>
                        </div>
                        <p className="text-gray-600 italic leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                            "
                            {trip.description ||
                                trip.body ||
                                "Sin comentarios adicionales..."}
                            "
                        </p>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
