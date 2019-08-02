import apiCall from 'utils/mock-api';
import { userRequest } from '../user/actions';
import * as types from './actionTypes';
import { IProfile, ThunkDispatch } from '../interfaces';


export const authLogout = () => async (dispatch: ThunkDispatch) => {
	localStorage.removeItem('user-token');
	dispatch({type: types.AUTH_LOGOUT});
}

export const authRequest = (user: IProfile) => async (dispatch: ThunkDispatch) => {
	dispatch({type: types.AUTH_REQUEST});
	apiCall({url: 'auth', data: user, method: 'POST'})
		.then((resp: {token: string}) => {
			localStorage.setItem('user-token', resp.token);
			// Here set the header of your ajax library to the token value.
			// example with axios
			// axios.defaults.headers.common['Authorization'] = resp.token
			dispatch({type: types.AUTH_SUCCESS, payload: resp.token});
			dispatch(userRequest());
			return resp;
		})
		.catch((err: Error) => {
			dispatch({type: types.AUTH_ERROR, payload: err});
			localStorage.removeItem('user-token');
		})
}

export const authGetTokenAndUserRequest = () => async (dispatch: ThunkDispatch) => {
	const token = localStorage.getItem('user-token');
	if(token) {
		dispatch({type: types.AUTH_SUCCESS, payload: token});
		dispatch(userRequest());
	}
}