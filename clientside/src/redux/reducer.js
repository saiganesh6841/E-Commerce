
const initialState = {
    loading: false,
    error: '',
    cartItems: []
};


export function reducer(state=initialState,action){

    switch (action.type) {
        case 'GET_CART_REQUEST':
            return {
                ...state,
                loading: true,
                error: ''
            };
        case 'GET_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
                error: ''
            };
        case 'GET_CART_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}