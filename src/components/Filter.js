import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  getTerm,
  findPokemon,
  sortPokemon,
  fetchPokemon,
} from '../actions/pokemonActions';

class Filter extends Component {
  render() {
    return (
      <div className="form-inline align-items-center">
        <div className="col-sm-5 my-1">
          <label className="justify-content-start">Buscar:</label>
          <div className="input-group">
            <input
              className="form-control w-auto"
              placeholder="pokemon"
              value={this.props.termoBusca}
              onChange={(e) => this.props.getTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.findPokemon}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-2 my-1">
          <label className="justify-content-start">&nbsp;</label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.props.fetchPokemon}
          >
            Limpar busca
          </button>
        </div>
        <div className="col-sm-3 my-1">
          <label className="justify-content-start">Ordenar por:</label>
          <select
            className="form-control"
            value={this.props.sort}
            onChange={(event) => {
              this.props.sortPokemon(
                this.props.filteredPokemon,
                event.target.value
              );
            }}
          >
            <option value="">Selecionar</option>
            <option value="a-to-z">A - Z</option>
            <option value="z-to-a">Z - A</option>
          </select>
        </div>
        <div className="col-sm-2 my-1">{`${this.props.filteredPokemon.length} pokemon encontrados.`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.pokemon.items,
  filteredPokemon: state.pokemon.filteredPokemon,
  sort: state.pokemon.sort,
  termoBusca: state.pokemon.termoBusca,
});

export default connect(mapStateToProps, {
  getTerm,
  findPokemon,
  sortPokemon,
  fetchPokemon,
})(Filter);
