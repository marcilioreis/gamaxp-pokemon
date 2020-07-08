export default {
  formatCurrency: function (num) {
    return 'R$ ' + Number(num.toFixed(2)).toLocaleString() + ' ';
  },
};
