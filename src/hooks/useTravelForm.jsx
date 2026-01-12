import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tripSchema } from "../schemas/tripSchema";
import { formatDate } from "../utils/formatDate";
import { correctAlert } from "../utils/alerts";
import {
    useAddTripMutation,
    useUpdateTripMutation,
} from "../services/journalsApi";

export function useTravelForm({ countryName, onClose, isEditMode, tripToEdit }) {
    const [addTrip, { isLoading }] = useAddTripMutation();
    const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(tripSchema),
        defaultValues: {
            countryName: countryName || "",
            date: tripToEdit ? tripToEdit.date : "",
            airline: "",
            rating: 5,
            description: "",
        },
    });

    const onSubmit = async (data) => {
        const standardDate = new Date(data.date).toISOString().split('T')[0];
        const formattedData = {
            ...data,
            date: standardDate,
            title: `Viaje a ${data.countryName}`,
            body: data.description,
        };

        try {
            if (isEditMode) {
                await updateTrip({
                    id: tripToEdit.id,
                    ...formattedData,
                }).unwrap();
                correctAlert("¡Viaje actualizado correctamente!");
            } else {
                await addTrip(formattedData).unwrap();
                correctAlert("Viaje registrado con éxito");
            }
            reset();
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    "laragon, docker, xampp"

    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        isLoading,
        isUpdating,
        reset,
        setValue,
    };
}
