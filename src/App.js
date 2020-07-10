import React, { Component } from 'react';
// import Alertify from 'alertifyjs';
import * as S from './styles/App.js';
import { Provider } from 'react-redux';
import Pokemon from './components/Pokemon';
import Filter from './components/Filter';
import Basket from './components/Basket';
import store from './store';
import './App.css';

class App extends Component {
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
                <Filter />

                <hr />

                <Pokemon />
              </div>
              <div className="col-md-3">
                <Basket />
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
