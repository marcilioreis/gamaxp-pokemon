import { combineReducers } from 'redux';
import pokemonReducers from './pokemonReducers';
import cartReducers from './cartReducers';

export default combineReducers({
  pokemon: pokemonReducers,
  cart: cartReducers,
});
