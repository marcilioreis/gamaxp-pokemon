import {
  FETCH_POKEMON,
  TERM_POKEMON,
  SEARCH_POKEMON,
  ORDER_POKEMON_BY_NAME,
} from '../actions/types';

const initState = { items: [], filteredPokemon: [], termoBusca: '', sort: '' };

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        items: action.payload.results,
        filteredPokemon: action.payload.results,
        termoBusca: '',
      };
    case TERM_POKEMON:
      return {
        ...state,
        termoBusca: action.payload.termoBusca,
      };
    case SEARCH_POKEMON:
      return {
        ...state,
        items: action.payload.results,
        filteredPokemon: action.payload.filteredPokemon,
      };
    case ORDER_POKEMON_BY_NAME:
      return {
        ...state,
        filteredPokemon: action.payload.items,
        sort: action.payload.sort,
      };

    default:
      return state;
  }
}
