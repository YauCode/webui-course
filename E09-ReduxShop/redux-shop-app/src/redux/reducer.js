const initialShopState = {
    shopProducts: [],
    cartProducts: []

}

const shopReducer = (state = initialShopState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                shopProducts: action.payload
            }
        case 'ADD_TO_SHOPPING_CARD':
            return {
                ...state,
                cartProducts: [...state.cartProducts, { payload: action.payload, id: action.id }]
            }
        case 'REMOVE_FROM_SHOPPING_CARD':
            const newCartProducts = state.cartProducts.filter(product => product.payload.id !== action.id);
            return {
                ...state,
                cartProducts: newCartProducts
            }
        default: return state;
    }
}

export default shopReducer