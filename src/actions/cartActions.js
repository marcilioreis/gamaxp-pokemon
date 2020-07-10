import { ADD_TO_CART, REMOVE_FROM_CART, FINISH_CART } from './types';
import Alertify from 'alertifyjs';

export const addToCart = (items, pokemon) => (dispatch) => {
  const cartItems = items.slice();
  let pokemonAlreadyInCart = false;

  const idPokemon = (pokemon) => {
    return pokemon.url.split('/')[pokemon.url.split('/').length - 2];
  };

  cartItems.forEach((cp) => {
    if (cp.name === pokemon.name) {
      pokemonAlreadyInCart = true;
      cp.count += 1;
    }
  });

  if (!pokemonAlreadyInCart) {
    cartItems.push({ ...pokemon, count: 1, price: idPokemon(pokemon) * 3.14 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  dispatch({ type: ADD_TO_CART, payload: { cartItems } });
};

export const removeFromCart = (items, pokemon) => (dispatch) => {
  const cartItems = items.slice().filter((a) => a.name !== pokemon.name);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
};

export const finishCart = () => (dispatch) => {
  const cartItems = [];
  localStorage.setItem('cartItems', cartItems);
  Alertify.success('Compra efetuada com sucesso!');
  dispatch({ type: FINISH_CART, payload: { cartItems } });
};
