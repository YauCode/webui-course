export const getProducts = (products) => {
    return {
        type: 'GET_PRODUCTS',
        payload: products
    };
}

export const addToShoppingCart = (product) => {
    return {
        type: 'ADD_TO_SHOPPING_CARD',
        payload: {
            ...product,
            id: Math.random().toString(36).substr(2, 9)
        }
    };
}

export const RemoveFromShoppingCart = (id) => {
    return {
        type: 'REMOVE_FROM_SHOPPING_CARD',
        id: id
    };
}
