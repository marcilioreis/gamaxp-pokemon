import React, { Component } from 'react';
import Alertify from 'alertifyjs';
import * as S from './styles/App.js';
import axios from 'axios';
import { Provider } from 'react-redux';
import Pokemon from './components/Pokemon';
import Filter from './components/Filter';
import Basket from './components/Basket';
import store from './store';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      filteredPokemon: [],
      cartItems: [],
      termo: '',
    };
    this.updateTermo = this.updateTermo.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);
  }
  componentWillMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`)
      .then((response) => {
        this.setState({
          results: response.data.results,
          filteredPokemon: response.data.results,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    if (localStorage.getItem('cartItems')) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cartItems')),
      });
    }
  }
  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }
  listProducts() {
    this.setState((state) => {
      if (state.sort !== '') {
        state.results.sort((a, b) =>
          state.sort === 'a-to-z'
            ? a.name > b.name
              ? 1
              : -1
            : a.name < b.name
            ? 1
            : -1
        );
      } else {
        state.results.sort((a, b) => (a.name > b.name ? 1 : -1));
      }

      return { filteredPokemon: state.results };
    });
  }
  handleAddToCart(e, pokemon) {
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      const idPokemon = (pokemon) => {
        return pokemon.url.split('/')[pokemon.url.split('/').length - 2];
      };

      cartItems.forEach((item) => {
        if (item.name === pokemon.name) {
          productAlreadyInCart = true;
          item.count++;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({
          ...pokemon,
          count: 1,
          price: idPokemon(pokemon) * 3.14,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return cartItems;
    });
  }
  handleRemoveFromCart(e, item) {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((el) => el.name !== item.name);

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return { cartItems };
    });
  }
  handleTransaction(e) {
    Alertify.success('Compra efetuada com sucesso!');

    this.setState(() => {
      const cartItems = [];

      // state.cartItems = emptyCart;

      localStorage.setItem('cartItems', cartItems);

      return { cartItems };
    });
  }
  updateTermo(e) {
    this.setState({ termo: e.target.value });
  }
  handleSearch() {
    const termo = this.state.termo;

    if (termo !== '') {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${termo}/?offset=0&limit=15`)
        .then((response) => {
          this.setState({
            results: response.data.forms,
            filteredPokemon: response.data.forms,
          });
        })
        .catch((err) => {
          console.error(err);
          Alertify.error('Sua busca não retornou resultados');
        });
    } else {
      Alertify.warning('Por favor, digite um termo para busca');
    }
  }
  render() {
    return (
      <Provider store={store}>
        <S.Wrapper>
          <div className="p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm fixed-top">
            <S.Image
              src="https://www.narita-airport.jp/img/original/3786"
              alt="Pokemon Store"
              style={{ maxWidth: '180px' }}
            />
          </div>
          <div className="container py-5" style={{ marginTop: '150px' }}>
            <div className="row">
              <div className="col-md-9 bg-light py-5">
                <Filter
                  termo={this.state.termo}
                  sort={this.state.sort}
                  handleChangeSort={this.handleChangeSort}
                  updateTermo={this.updateTermo}
                  handleSearch={this.handleSearch}
                  count={this.state.filteredPokemon.length}
                />

                <hr />

                <Pokemon
                  results={this.state.filteredPokemon}
                  handleAddToCart={this.handleAddToCart}
                />
              </div>
              <div className="col-md-3">
                <Basket
                  cartItems={this.state.cartItems}
                  handleRemoveFromCart={this.handleRemoveFromCart}
                  handleTransaction={this.handleTransaction}
                />
              </div>
            </div>
          </div>
          <S.Footer>
            <p className="mb-1">© 2020 Marcílio Reis</p>
            <ul className="list-inline">
              <li className="list-inline-item w-10">
                <div className="github">
                  <a
                    href="https://github.com/marcilioreis/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <S.Image
                      style={{ maxWidth: '50px' }}
                      alt="github"
                      src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iQm9sZCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMTIgLjVjLTYuNjMgMC0xMiA1LjI4LTEyIDExLjc5MiAwIDUuMjExIDMuNDM4IDkuNjMgOC4yMDUgMTEuMTg4LjYuMTExLjgyLS4yNTQuODItLjU2NyAwLS4yOC0uMDEtMS4wMjItLjAxNS0yLjAwNS0zLjMzOC43MTEtNC4wNDItMS41ODItNC4wNDItMS41ODItLjU0Ni0xLjM2MS0xLjMzNS0xLjcyNS0xLjMzNS0xLjcyNS0xLjA4Ny0uNzMxLjA4NC0uNzE2LjA4NC0uNzE2IDEuMjA1LjA4MiAxLjgzOCAxLjIxNSAxLjgzOCAxLjIxNSAxLjA3IDEuODAzIDIuODA5IDEuMjgyIDMuNDk1Ljk4MS4xMDgtLjc2My40MTctMS4yODIuNzYtMS41NzctMi42NjUtLjI5NS01LjQ2Ni0xLjMwOS01LjQ2Ni01LjgyNyAwLTEuMjg3LjQ2NS0yLjMzOSAxLjIzNS0zLjE2NC0uMTM1LS4yOTgtLjU0LTEuNDk3LjEwNS0zLjEyMSAwIDAgMS4wMDUtLjMxNiAzLjMgMS4yMDkuOTYtLjI2MiAxLjk4LS4zOTIgMy0uMzk4IDEuMDIuMDA2IDIuMDQuMTM2IDMgLjM5OCAyLjI4LTEuNTI1IDMuMjg1LTEuMjA5IDMuMjg1LTEuMjA5LjY0NSAxLjYyNC4yNCAyLjgyMy4xMiAzLjEyMS43NjUuODI1IDEuMjMgMS44NzcgMS4yMyAzLjE2NCAwIDQuNTMtMi44MDUgNS41MjctNS40NzUgNS44MTcuNDIuMzU0LjgxIDEuMDc3LjgxIDIuMTgyIDAgMS41NzgtLjAxNSAyLjg0Ni0uMDE1IDMuMjI5IDAgLjMwOS4yMS42NzguODI1LjU2IDQuODAxLTEuNTQ4IDguMjM2LTUuOTcgOC4yMzYtMTEuMTczIDAtNi41MTItNS4zNzMtMTEuNzkyLTEyLTExLjc5MnoiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4K"
                    />
                  </a>
                </div>
              </li>
              <li className="list-inline-item w-10">
                <div className="linkedin">
                  <a
                    href="https://www.linkedin.com/in/marcilio-reis-97a5546a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <S.Image
                      style={{ maxWidth: '50px' }}
                      alt="linkedin"
                      src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMjU2IDBjLTE0MS4zNjMyODEgMC0yNTYgMTE0LjYzNjcxOS0yNTYgMjU2czExNC42MzY3MTkgMjU2IDI1NiAyNTYgMjU2LTExNC42MzY3MTkgMjU2LTI1Ni0xMTQuNjM2NzE5LTI1Ni0yNTYtMjU2em0tNzQuMzkwNjI1IDM4N2gtNjIuMzQ3NjU2di0xODcuNTc0MjE5aDYyLjM0NzY1NnptLTMxLjE3MTg3NS0yMTMuMTg3NWgtLjQwNjI1Yy0yMC45MjE4NzUgMC0zNC40NTMxMjUtMTQuNDAyMzQ0LTM0LjQ1MzEyNS0zMi40MDIzNDQgMC0xOC40MDYyNSAxMy45NDUzMTMtMzIuNDEwMTU2IDM1LjI3MzQzNy0zMi40MTAxNTYgMjEuMzI4MTI2IDAgMzQuNDUzMTI2IDE0LjAwMzkwNiAzNC44NTkzNzYgMzIuNDEwMTU2IDAgMTgtMTMuNTMxMjUgMzIuNDAyMzQ0LTM1LjI3MzQzOCAzMi40MDIzNDR6bTI1NS45ODQzNzUgMjEzLjE4NzVoLTYyLjMzOTg0NHYtMTAwLjM0NzY1NmMwLTI1LjIxODc1LTkuMDI3MzQzLTQyLjQxNzk2OS0zMS41ODU5MzctNDIuNDE3OTY5LTE3LjIyMjY1NiAwLTI3LjQ4MDQ2OSAxMS42MDE1NjMtMzEuOTg4MjgyIDIyLjgwMDc4MS0xLjY0ODQzNyA0LjAwNzgxMy0yLjA1MDc4MSA5LjYwOTM3NS0yLjA1MDc4MSAxNS4yMTQ4NDR2MTA0Ljc1aC02Mi4zNDM3NXMuODE2NDA3LTE2OS45NzY1NjIgMC0xODcuNTc0MjE5aDYyLjM0Mzc1djI2LjU1ODU5NGM4LjI4NTE1Ny0xMi43ODEyNSAyMy4xMDkzNzUtMzAuOTYwOTM3IDU2LjE4NzUtMzAuOTYwOTM3IDQxLjAxOTUzMSAwIDcxLjc3NzM0NCAyNi44MDg1OTMgNzEuNzc3MzQ0IDg0LjQyMTg3NHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+Cg=="
                    />
                  </a>
                </div>
              </li>
            </ul>
          </S.Footer>
        </S.Wrapper>
      </Provider>
    );
  }
}

export default App;
