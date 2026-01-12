import { X } from "lucide-react";
import { useEffect } from "react";
import { useTravelForm } from "../hooks/useTravelForm";

export default function TravelForm({ countryName, onClose, tripToEdit }) {
    
    const isEditMode = !!tripToEdit;

    const { onSubmit, register, handleSubmit, errors, isLoading, setValue } =
        useTravelForm({ countryName, onClose, isEditMode, tripToEdit });

    useEffect(() => {
        if (tripToEdit) {
            setValue(
                "countryName",
                tripToEdit.countryName || tripToEdit.title
            );
            setValue("airline", tripToEdit.airline);
            setValue("rating", tripToEdit.rating);
            setValue(
                "description",
                tripToEdit.description || tripToEdit.body
            );
            setValue("date", tripToEdit.date);
        }
    }, [tripToEdit, setValue]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative animate-fade-in">
                <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                    <h2 className="text-lg font-bold">
                        {isEditMode
                            ? `Editar Viaje a ${
                                  tripToEdit.countryName || tripToEdit.title
                              }`
                            : `Registrar Nuevo Viaje ${countryName ? `a ${countryName}` : ''}`}
                    </h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="hover:bg-blue-700 p-1 rounded-full cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-4"
                >
                    <input type="hidden" {...register("countryName")} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fecha del viaje
                        </label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            {...register("date")}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.date.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Aerolínea
                        </label>
                        <input
                            type="text"
                            placeholder="Latam, Iberia..."
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            {...register("airline")}
                        />
                        {errors.airline && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.airline.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Calificación
                        </label>
                        <select
                            {...register("rating")}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ - Excelente</option>
                            <option value={4}>⭐⭐⭐⭐ - Muy bueno</option>
                            <option value={3}>⭐⭐⭐ - Bueno</option>
                            <option value={2}>⭐⭐ - Regular</option>
                            <option value={1}>⭐ - Terrible</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Reseña
                        </label>
                        <textarea
                            rows={3}
                            placeholder="¿Qué fue lo que más te gustó?"
                            {...register("description")}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        ></textarea>

                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer font-medium"
                        >
                            {isLoading
                                ? "Guardando..."
                                : isEditMode
                                ? "Guardar Cambios"
                                : "Guardar Viaje"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}