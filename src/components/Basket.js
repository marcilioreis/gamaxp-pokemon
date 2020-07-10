import React, { Component } from 'react';
import util from '../util';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, finishCart } from '../actions/cartActions';

class Basket extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          'O carrinho está vazio.'
        ) : (
          <div>
            Você tem {cartItems.length} itens no seu carrinho. <hr />
          </div>
        )}

        {cartItems.length > 0 && (
          <div>
            <ul style={{ marginLeft: -25, listStyle: 'none' }}>
              {cartItems.map((item) => (
                <li key={item.name}>
                  <b>{item.name}</b>
                  <button
                    style={{ float: 'right' }}
                    className="btn btn-danger btn-xs"
                    onClick={() =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }
                  >
                    X
                  </button>
                  <br />
                  {item.count} X {util.formatCurrency(item.price)}
                </li>
              ))}
            </ul>

            <b>
              Total:{' '}
              {util.formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </b>
            <br />
            <button
              onClick={() => this.props.finishCart()}
              className="btn btn-primary btn-block mt-5"
            >
              Fechar Pedido
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  finishCart,
})(Basket);
