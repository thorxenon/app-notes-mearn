import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, 
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstant";
import axios from 'axios';

export const register = (firstName, lastName, email, password, pic) => async(dispatch) =>{
    try{
        dispatch({type: USER_REGISTER_REQUEST});

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
  
        const { data } = await axios.post(
            '/api/users/register',
            { name: {
                firstName,
                lastName
            }, pic, email, password },
            config
        );

        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const login = (email, password) => async(dispatch) =>{
    try {
        dispatch({ type: USER_LOGIN_REQUEST});

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const { data } = await axios.post(
        '/api/users/login', 
        {
            email, password
        },config);

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.message
                    : error.message
        })
    };
};

export const updateUserAction = (user) => async(dispatch, getState) =>{
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const {  userLogin : { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(
            '/api/users/profile',
            user,config
        );

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.error
                ? error.response.data.error
                : error.error,
        });
    };
};

export const logout = () => async(dispatch) =>{
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
};