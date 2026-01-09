import Swal from "sweetalert2";

export const correctAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Viaje creado!",
        text: "El viaje ha sido creado correctamente.",
        confirmButton: false,
        timer: 1500,
    });
};
