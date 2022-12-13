import Swal from "sweetalert2";
import {
	EDIT_SUCCESS,
	ERROR_MODAL_TITLE,
	INSERT_SUCCESS,
	ON_REMOVE_MESSAGE,
	REMOVE_SUCCESS,
	SUCCESS_MODAL_TITLE,
} from "./consts";

const showError = (errorMessage: string | undefined) => {
	Swal.fire({
		icon: "error",
		title: ERROR_MODAL_TITLE,
		text: errorMessage,
	});
};

const successMessage = (successMessage: string) => {
	Swal.fire({
		icon: "success",
		title: SUCCESS_MODAL_TITLE,
		text: successMessage,
		showConfirmButton: false,
		timer: 1500,
	});
};

const showInsertSuccess = () => {
	successMessage(INSERT_SUCCESS);
};

const showEditSuccess = () => {
	successMessage(EDIT_SUCCESS);
};

const showRemoveSuccess = () => {
	successMessage(REMOVE_SUCCESS);
};

const confirmRemoveItem = async () => {
	return await Swal.fire({
		title: ON_REMOVE_MESSAGE,
		showCancelButton: false,
		showDenyButton: true,
		confirmButtonText: "Sim",
		denyButtonText: `Não`,
	});
};

const AlertMessage = {
	showError,
	showInsertSuccess,
	showEditSuccess,
	showRemoveSuccess,
	confirmRemoveItem,
};

export default AlertMessage;
