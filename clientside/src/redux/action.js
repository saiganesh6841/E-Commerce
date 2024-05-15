import axios from "axios";
import { ReduxStore } from "./store";
import { baseURL } from "../App";


const dispatch=ReduxStore.dispatch


export function cartItems(token) {
    return () => {
        dispatch({
            type: 'GET_CART_REQUEST'
        });

        const token = localStorage.getItem('TOKEN');

        axios.post(`${baseURL}/getCart`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            dispatch({
                type: 'GET_CART_SUCCESS',
                payload: response.data.cart.products
            });
        })
        .catch(error => {
            console.error('Error fetching cart details:', error);
            dispatch({
                type: 'GET_CART_FAILURE',
                payload: error.message
            });
        });
    };
}