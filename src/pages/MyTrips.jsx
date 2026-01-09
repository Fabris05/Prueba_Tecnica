import { MapPin } from "lucide-react";

export default function MyTrips() {
    const trips = [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto bg-orange-50 rounded-md shadow-md">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 flex justify-center items-center gap-2 p-6">
                    <MapPin className="text-blue-600" />
                    Mi Bitácora de Viajes
                </h1>
            </div>
            <div className="">
                {trips.length === 0 ? (
                    <p className="text-center text-gray-500 mt-8">
                        No has agregado ningún viaje aún.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        Aquí se mostrarán los viajes guardados.
                    </div>
                )}
            </div>
        </div>
    );
}
