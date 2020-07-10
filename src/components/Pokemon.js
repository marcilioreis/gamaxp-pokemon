import React, { Component } from 'react';
import { connect } from 'react-redux';
import util from '../util';
import { addToCart } from '../actions/cartActions';
import { fetchPokemon } from '../actions/pokemonActions';

class Pokemon extends Component {
  componentWillMount() {
    this.props.fetchPokemon();
  }
  render() {
    const idPokemon = (pokemon) => {
      return pokemon.url.split('/')[pokemon.url.split('/').length - 2];
    };
    const imgUrl = (idPokemon) => {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
    };
    const pokemonItems = this.props.results.map((pokemon) => (
      <div className="col-md-4" key={idPokemon(pokemon)}>
        <div className="thumbnail text-center">
          <a
            href={`#${pokemon.name}`}
            onClick={() => this.props.addToCart(this.props.cartItems, pokemon)}
          >
            <img src={imgUrl(idPokemon(pokemon))} alt={pokemon.name} />
            <p className="text-primary">{pokemon.name}</p>
          </a>

          <b>{util.formatCurrency(idPokemon(pokemon) * 3.14)}</b>
          <br />
          <button
            className="btn btn-primary btn-sm my-3"
            onClick={() => this.props.addToCart(this.props.cartItems, pokemon)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    ));

    return <div className="row">{pokemonItems}</div>;
  }
}

const mapStateToProps = (state) => ({
  results: state.pokemon.filteredPokemon,
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, { fetchPokemon, addToCart })(Pokemon);
