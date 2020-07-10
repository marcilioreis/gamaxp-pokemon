import {
  FETCH_POKEMON,
  TERM_POKEMON,
  SEARCH_POKEMON,
  ORDER_POKEMON_BY_NAME,
} from './types';
import axios from 'axios';
import Alertify from 'alertifyjs';

let termoBusca = '';

export const fetchPokemon = () => (dispatch) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`)
    .then((response) => {
      return dispatch({
        type: FETCH_POKEMON,
        payload: {
          results: response.data.results,
          termoBusca: '',
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getTerm = (termoForm) => (dispatch) => {
  termoBusca = termoForm;

  return dispatch({ type: TERM_POKEMON, payload: { termoBusca: termoForm } });
};

export const findPokemon = () => (dispatch) => {
  const termo = termoBusca;

  if (termo !== '') {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${termo}/?offset=0&limit=15`)
      .then((response) => {
        return dispatch({
          type: SEARCH_POKEMON,
          payload: {
            results: response.data.forms,
            filteredPokemon: response.data.forms,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        Alertify.error('Sua busca não retornou resultados');
      });
  } else {
    Alertify.warning('Por favor, digite um termo para busca');
  }
};

export const sortPokemon = (items, sort) => (dispatch) => {
  const pokemon = items.slice();

  if (sort !== '') {
    pokemon.sort((a, b) =>
      sort === 'a-to-z' ? (a.name > b.name ? 1 : -1) : a.name < b.name ? 1 : -1
    );
  } else {
    pokemon.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  dispatch({
    type: ORDER_POKEMON_BY_NAME,
    payload: {
      sort: sort,
      items: pokemon,
    },
  });
};
