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

export const deleteAlert = (deleteItem, id) => {
    Swal.fire({
        title: "¿Seguro que deseas eliminar este viaje?",
        icon: "warning",
        showCancelButton: true,
        showDenyButton: false,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#d33",
        denyButtonText: `No eliminar`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Viaje eliminado",
                "El viaje ha sido eliminado correctamente.",
                "success"
            );
            await deleteItem(id);
        }
    });
};
