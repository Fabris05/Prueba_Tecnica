import { z } from "zod";

export const tripSchema = z.object({
    countryName: z.string().min(1, "El nombre del país es obligatorio"),
    date: z.coerce.date({message: "La fecha es obligatoria"}).refine(
        (date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date <= today;
        },
        {
            message: "La fecha no puede ser futura",
        }
    ),
    airline: z.string().min(1, "La aerolínea es obligatoria"),
    rating: z.coerce.number({message: "La calificación es obligatoria"})
        .min(1)
        .max(5, "La calificación debe estar entre 1 y 5"),
    description: z
        .string()
        .min(5, "Cuenta más sobre tu viaje (5 caracteres como mínimo)"),
});
