// import axios, { AxiosError } from "axios";
import { UserActions } from "../store/user";
import axios from "../Service/axios";

export const base_url = "http://localhost:5000";

const userId = localStorage.getItem("userId");

export const loginUser = async (formData: any, dispatch: any) => {
	try {
		dispatch(UserActions.startLoading());

		const response = await axios.post(`${base_url}/users/login`, formData);
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("username", response.data.user.firstname);
		localStorage.setItem("userId", response.data.user.id);
		localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", response.data.user.email);
		localStorage.setItem("profilePic", response.data.user.profilePic);
		console.log(response.data);
		dispatch(UserActions.endLoading());
		dispatch(UserActions.loginUser(response.data.user));
		// window.location.reload()
		console.log("Store", response.data);
		return response;
	} catch (err) {
		console.log("Store", formData);
		console.log(err);
		dispatch(UserActions.endLoading());
		return err.response;
	}
};

export const paystackVerify = async (cardDetails: any, dispatch: any) => {
	try {
		dispatch(UserActions.startLoading());
		console.log("Verifying payment...");
		dispatch(UserActions.paySuccess());
		const response = await axios.post("/api/verify-payment/", cardDetails);
		console.log(response.status);

		response.status == 200 ? dispatch(UserActions.paySuccess()) : dispatch(UserActions.payFail());
		dispatch(UserActions.endLoading());
		dispatch(UserActions.paystackVerify(response.data));
		console.log("Store...", response.data);
		return response;
	} catch (err: unknown) {
		console.log("Store", cardDetails);
		console.log(err);
		dispatch(UserActions.endLoading());
		// dispatch(UserActions.payFail())
		return err.response;
	}
};

export const shipping = async (formDetails: any, dispatch: any) => {
	try {
		dispatch(UserActions.startLoading());
		dispatch(UserActions.paySuccess());
		const response = await axios.post(`${base_url}/delivery/${userId}/add-address`, formDetails);
		console.log(response.data);

		dispatch(UserActions.endLoading());
		dispatch(UserActions.shipping(response.data));
		console.log("Store", response.data);
		return response;
	} catch (err: unknown) {
		console.log("Store", formDetails);
		console.log(err);
		dispatch(UserActions.endLoading());
		return err.response;
	}
};

export const getUser = async (dispatch: any) => {
	try {
		const response = await axios.get(`${base_url}/all`);

		// console.log('resp',response.data.name)
		if (!response.data) {
			throw new Error("error fetching data");
		}

		const data = response.data;
		console.log(data);
		dispatch(UserActions.getUser(data));
	} catch (error) {
		console.log(error);
	}
};

export const getBids = async (productid, dispatch: any) => {
	try {
		const response = await axios.get(`${base_url}/bids`);

		// console.log('resp',response.data.name)
		if (!response.data) {
			throw new Error("error fetching data");
		}

		const data = response.data;
		console.log(data);
		dispatch(UserActions.getBids(data));
	} catch (error) {
		console.log(error);
	}
};