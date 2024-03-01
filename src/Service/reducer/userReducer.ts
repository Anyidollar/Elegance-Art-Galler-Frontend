import { LOADING_USER, LOGIN_FAIL, REGISTER_FAIL, REGISTER_USER } from "../Type";


const initialState = {
    authenticated: false,
    loading: false,
    error:'',
    user: {},
};




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (state = initialState, action:any) {
    switch(action.type){
        case LOADING_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
      case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case REGISTER_USER:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
        default: return state
    }
}