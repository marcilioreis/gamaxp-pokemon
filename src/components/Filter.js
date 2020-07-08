import React, { Component } from 'react';

// import { connect } from 'react-redux';
// import { filterProducts, sortProducts } from '../actions/productActions';

export default class Filter extends Component {
  render() {
    return (
      <div className="form-inline align-items-center">
        <div className="col-sm-6 my-1">
          <label className="justify-content-start">Buscar:</label>
          <div className="input-group">
            <input
              className="form-control w-auto"
              placeholder="pokemon"
              value={this.props.termo}
              onChange={this.props.updateTermo}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.handleSearch}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-4 my-1">
          <label className="justify-content-start">Ordenar por:</label>
          <select
            className="form-control"
            value={this.props.sort}
            onChange={this.props.handleChangeSort}
          >
            <option value="">Selecionar</option>
            <option value="a-to-z">A - Z</option>
            <option value="z-to-a">Z - A</option>
          </select>
        </div>

        <div className="col-sm-2 my-1">{`${this.props.count} pokemon encontrados.`}</div>
      </div>
    );
  }
}

// class Filter extends Component {
//   render() {
//     return (
//       <div className="row">
//         <div className="col-md-4">{`${this.props.filteredProducts.length} products found.`}</div>
//         <div className="col-md-4">
//           <label>
//             Order by
//             <select
//               className="form-control"
//               value={this.props.sort}
//               onChange={(event) => {
//                 this.props.sortProducts(
//                   this.props.filteredProducts,
//                   event.target.value
//                 );
//               }}
//             >
//               <option value="">Select</option>
//               <option value="lowestprice">Lowest to highest</option>
//               <option value="highestprice">Highest to lowest</option>
//             </select>
//           </label>
//         </div>
//         <div className="col-md-4">
//           <label>
//             {' '}
//             Filter Size
//             <select
//               className="form-control"
//               value={this.props.size}
//               onChange={(event) => {
//                 this.props.filterProducts(
//                   this.props.products,
//                   event.target.value
//                 );
//               }}
//             >
//               <option value="">ALL</option>
//               <option value="x">XS</option>
//               <option value="s">S</option>
//               <option value="m">M</option>
//               <option value="l">L</option>
//               <option value="xl">XL</option>
//               <option value="xxl">XXL</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   products: state.products.items,
//   filteredProducts: state.products.filteredItems,
//   size: state.products.size,
//   sort: state.products.sort,
// });
// export default connect(mapStateToProps, { filterProducts, sortProducts })(
//   Filter
// );
