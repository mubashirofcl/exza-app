import Swal from "sweetalert2";

export const alertSuccess = (title, text) => {
    Swal.fire({
        icon: "success",
        title,
        text,
        timer: 2000,
        showConfirmButton: false
    });
};

export const alertError = (title, text) => {
    Swal.fire({
        icon: "error",
        title,
        text,
    });
};

export const alertConfirm = async (title, text) => {
    return await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
    });
};
