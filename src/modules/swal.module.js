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
	Swal.fire({
		icon: "success",
		title: "Success",
		text: text,
		confirmButtonColor: "#ffc507",
	});
}

export function emitError(text = "Something went wrong!") {
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
	Swal.fire({
		icon: "error",
		title: "Error",
		text: text,
		confirmButtonColor: "#ffc507",
	});
}

export function emitConfirmation(text, onConfirm) {
	Swal.fire({
		icon: "warning",
		title: "Confirmation",
		text: text ? text : "Are you sure that you want to proceed?",
		showCancelButton: true,
		confirmButtonText: "Yes",
		confirmButtonColor: "#ffc507",
	}).then((response) => {
		if (response.isConfirmed) {
			onConfirm();
		}
	});
}
