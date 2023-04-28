import * as dotenv from "dotenv";
dotenv.config();

export const URL = REACT_APP_BACKEND_URL;
export const FORM_HEADER = {
	headers: {
		"content-type": "multipart/form-data",
	},
};
