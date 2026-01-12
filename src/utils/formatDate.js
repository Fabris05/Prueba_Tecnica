export const formatDate = (rawDate) => {
    if (!rawDate) return "Sin fecha";

    if (rawDate.includes(" de ")) return rawDate;

    const [year, month, day] = rawDate.split("-");
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
