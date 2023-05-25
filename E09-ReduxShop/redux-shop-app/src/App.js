/* eslint-disable no-unused-vars */
import './App.css';
import { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import store from "./redux/store";
import { getProducts, addToShoppingCart, RemoveFromShoppingCart } from './redux/actions';

const Products = () => {
  const dispatch = useDispatch();
  const shopProducts = useSelector(state => state.shopProducts)

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        console.log(response.data);
        dispatch(getProducts(response.data))
      })
      .catch(error => {
        console.log('Error getting products: ', error)
      });

  }, [dispatch])

  return (
    <div className="shop">
      <h1>Products</h1>
      <div>
        {shopProducts.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

const Product = ({ product }) => {

  const dispatch = useDispatch()
  const handleAddToCart = () => {
    console.log(product)
    dispatch(addToShoppingCart(product))

  }

  return (
    <div className="container">
      <button className="buttonBuy" onClick={handleAddToCart}>Buy</button>
      <div>
        <img src={product.image} alt={product.title} className="img" />
      </div>
      <h3>{product.title}</h3>
      <h4>{product.price}€</h4>
      <p className="description">{product.description}</p>
      <p className="category">{product.category}</p>
    </div>
  );
};

const ShoppingCart = () => {
  const cartProducts = useSelector(state => state.cartProducts)

  const totalPrice = cartProducts.reduce(
    (acc, curr) => acc + curr.payload.price,
    0
  );

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cartHolder">
        {cartProducts.map(product => (
          <CartProduct
            key={product.payload.id}
            product={product}
          />
        ))}
      </div>
      <h3>Total: {totalPrice.toFixed(2)}€</h3>
    </div>
  );
};

const CartProduct = ({ product }) => {
  const dispatch = useDispatch()
  const handleRemoveFromCart = () => {
    dispatch(RemoveFromShoppingCart(product.payload.id))
  }

  return (
    <div className="cartProd">
      <div>
        <img className="cart-img" src={product.payload.image} alt={product.title} />
      </div>
      <div className="cart-info">
        <p className="cart-title">{product.payload.title}</p>
        <p>Price: ${product.payload.price}</p>
      </div>
      <div>
        <button className="buttonRemove" onClick={() => handleRemoveFromCart(product.payload.id)} >X</button>
      </div>
    </div >
  );
};


function App() {
  return (
    <Provider store={store}>
      <div className="grid-container">
        <Products />
        <ShoppingCart />
      </div>
    </Provider>
  );
}

export default App;
