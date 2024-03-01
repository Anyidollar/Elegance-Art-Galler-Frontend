import { LOADING_USER, LOGIN_FAIL, LOGIN_USER, REGISTER_FAIL, REGISTER_USER } from "../Type";
import axiosInstance from "../../Request/axiosinstance";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { toast } from 'react-toastify'
import { LoginDataType } from "../../components/Login";
import { FormDataType } from "../../components/Register";


export const register = (userData: FormDataType) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING_USER });
  
      // Make an asynchronous API request to register the user
      const response = await axiosInstance.post("/user", userData);
  
      // Dispatch the success action if the registration is successful
      dispatch({ type: REGISTER_USER, payload: response.data });
      toast.success(response.data.message)
  
      // You might want to do something with the response, e.g., store user data in the state
      console.log(response.data);
    } catch (error) {
      const customErr = error as AxiosError;
      // Dispatch the failure action if an error occurs during registration
      dispatch({
        type: REGISTER_FAIL,
        payload: customErr.response ? customErr.response.data : "Something went wrong",
      });
    }
  };


  export const login = (userData: LoginDataType) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING_USER });
  
      // Make an asynchronous API request to log in the user
      const response = await axiosInstance.post("/login", userData);
  
      // Dispatch the success action if login is successful
      dispatch({ type: LOGIN_USER, payload: response.data });
  
      // You might want to do something with the response, e.g., store user data in the state
      console.log(response.data);
    } catch (error) {
      const customErr = error as AxiosError;
      // Dispatch the failure action if an error occurs during login
      dispatch({
        type: LOGIN_FAIL,
        payload: customErr.response ? customErr.response.data : "Something went wrong",
      });
    }
  };