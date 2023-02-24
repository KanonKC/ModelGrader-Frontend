import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function emitSuccess(text) {
    // toast.error(text, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     });
    Swal.fire("Success",text,"success")
}

export function emitError(text) {
    // toast.success(text, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     });
    Swal.fire("Error",text,"error")
}
