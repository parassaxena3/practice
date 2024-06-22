var StockSpanner = function () {
  this.arr = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.arr.push(price);
  
};

let st = new StockSpanner();
let x = st.next(100);
x = st.next(200);

let s = 2;
/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
